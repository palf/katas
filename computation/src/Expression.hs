module Main where

import Reducible

data Expression a
  = Number a
  | Add (Expression a) (Expression a)
  | Multiply (Expression a) (Expression a)

instance (Show a) => Show (Expression a) where
  show (Number x) = "(n: " ++ show x ++ ")"
  show (Add l r) = "(add: " ++ show l ++ ", " ++ show r ++ ")"
  show (Multiply l r) = "(multiply: " ++ show l ++ ", " ++ show r ++ ")"

instance Reducible (Expression) where
  step = stepExpression
  reduce = reduceExpression

stepExpression :: (Num a) => Expression a -> Either (Expression a) a
stepExpression (Number x) = Right x
stepExpression (Add l r) = Left $ runAdd l r
stepExpression (Multiply l r) = Left $ runMultiply l r

update1 :: (Num t) => (Expression t -> Expression a) -> (t -> a) -> Expression t -> Expression a
update1 key f x1 = parseFirst
  where
    parseFirst = either (updateFirst) (wrapOperation) (stepExpression x1)
    updateFirst x = key x
    wrapOperation x = Number (f x)

update2 :: (Num t1, Num t2) => (Expression t1 -> Expression t2 -> Expression a) -> (t1 -> t2 -> a) -> Expression t1 -> Expression t2 -> Expression a
update2 key f l r = parseLeft
  where
    parseLeft = either (updateLeft) (parseRight) (stepExpression l)
    parseRight x = either (updateRight) (wrapOperation x) (stepExpression r)
    updateLeft x = key x r
    updateRight x = key l x
    wrapOperation x y = Number (f x y)

runAdd :: (Num a) => Expression a -> Expression a -> Expression a
runAdd = update2 Add (+)

runMultiply :: (Num a) => Expression a -> Expression a -> Expression a
runMultiply = update2 Multiply (*)

reduceExpression :: (Num a) => Expression a -> a
reduceExpression (Number x) = x
reduceExpression e = either reduceExpression id (stepExpression e)
