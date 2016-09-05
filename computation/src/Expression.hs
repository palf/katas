{-# LANGUAGE GADTs #-}
module Expression where

import Reducible

data Expression a where
  Boolean :: Bool -> Expression Bool
  Number :: (Num a) => a -> Expression a
  Add :: (Num a) => Expression a -> Expression a -> Expression a
  Multiply :: (Num a) => Expression a -> Expression a -> Expression a
  If :: Expression Bool -> Expression a -> Expression a -> Expression a
  LessThan :: (Ord a, Show a) => Expression a -> Expression a -> Expression Bool

instance (Show a) => Show (Expression a) where
  show (Boolean p) = "(b: " ++ show p ++ ")"
  show (Number x) = "(n: " ++ show x ++ ")"
  show (Add l r) = "(add: " ++ show l ++ ", " ++ show r ++ ")"
  show (Multiply l r) = "(multiply: " ++ show l ++ ", " ++ show r ++ ")"
  show (If p l r) = "(if: " ++ show p ++ " then: " ++ show l ++ " else: " ++ show r ++ ")"
  show (LessThan l r) = "(<: " ++ show l ++ ", " ++ show r ++ ")"
  show _ = "(?:)"

instance Reducible Expression where
  step = stepExpression
  reduce = reduceExpression

stepExpression :: Expression a -> Either (Expression a) a
stepExpression (Boolean p) = Right p
stepExpression (Number x) = Right x
stepExpression (Add l r) = Left $ runAdd l r
stepExpression (Multiply l r) = Left $ runMultiply l r
stepExpression (If p l r) = Left $ runIf p l r
stepExpression (LessThan l r) = Left $ runLessThan l r

update1 :: (Num a) => (Expression t -> Expression a) -> (t -> a) -> Expression t -> Expression a
update1 key f x1 = parseFirst
  where
    parseFirst = either updateFirst wrapOperation (stepExpression x1)
    updateFirst = key
    wrapOperation x = Number (f x)

update2 :: (Num a) => (Expression t1 -> Expression t2 -> Expression a) -> (t1 -> t2 -> a) -> Expression t1 -> Expression t2 -> Expression a
update2 key f l r = parseLeft
  where
    parseLeft = either updateLeft parseRight (stepExpression l)
    parseRight x = either updateRight (wrapOperation x) (stepExpression r)
    updateLeft x = key x r
    updateRight = key l
    wrapOperation x y = Number (f x y)

runAdd :: (Num a) => Expression a -> Expression a -> Expression a
runAdd = update2 Add (+)

runMultiply :: (Num a) => Expression a -> Expression a -> Expression a
runMultiply = update2 Multiply (*)

runIf :: Expression Bool -> Expression a -> Expression a -> Expression a
runIf p l r = parseFirst
  where
    parseFirst = either updateFirst wrapOperation (stepExpression p)
    updateFirst x = If x l r
    wrapOperation x = if x then l else r

runLessThan :: (Ord a, Show a) => Expression a -> Expression a -> Expression Bool
runLessThan l r = parseLeft
  where
    parseLeft = either updateLeft parseRight (stepExpression l)
    parseRight x = either updateRight (wrapOperation x) (stepExpression r)
    updateLeft x = LessThan x r
    updateRight = LessThan l
    wrapOperation x y = Boolean (x < y)

reduceExpression :: Expression a -> a
reduceExpression (Number x) = x
reduceExpression e = either reduceExpression id (stepExpression e)
