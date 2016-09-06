{-# LANGUAGE GADTs #-}
module Expression where

import Reducible
import qualified Data.Map as Map
import qualified Data.Maybe as Maybe

data Expression a where
  Boolean :: Bool -> Expression Bool
  Number :: (Num a) => a -> Expression a
  Add :: (Num a) => Expression a -> Expression a -> Expression a
  Multiply :: (Num a) => Expression a -> Expression a -> Expression a
  If :: Expression Bool -> Expression a -> Expression a -> Expression a
  LessThan :: (Ord a, Show a) => Expression a -> Expression a -> Expression Bool
  Variable :: Key -> Environment a -> Expression a

instance (Show a) => Show (Expression a) where
  show (Boolean p) = "(b: " ++ show p ++ ")"
  show (Number x) = "(n: " ++ show x ++ ")"
  show (Add l r) = "(add: " ++ show l ++ ", " ++ show r ++ ")"
  show (Multiply l r) = "(multiply: " ++ show l ++ ", " ++ show r ++ ")"
  show (If p l r) = "(if: " ++ show p ++ " then: " ++ show l ++ " else: " ++ show r ++ ")"
  show (LessThan l r) = "(<: " ++ show l ++ ", " ++ show r ++ ")"
  show (Variable k _) = "(var: " ++ show k ++ ")"
  -- show _ = "(?:)"

instance Reducible Expression where
  step = stepExpression
  reduce = reduceExpression

type Key = String
type Environment a = Map.Map Key (Expression a)

makeEnvironment :: [(Key, Expression a)] -> Environment a
makeEnvironment pairs = Map.fromList pairs

reduceExpression :: Expression a -> a
reduceExpression (Number x) = x
reduceExpression e = either reduceExpression id (stepExpression e)

stepExpression :: Expression a -> Either (Expression a) a
stepExpression (Boolean p) = Right p
stepExpression (Number x) = Right x
stepExpression (Add l r) = Left $ runAdd l r
stepExpression (Multiply l r) = Left $ runMultiply l r
stepExpression (If p l r) = Left $ runIf p l r
stepExpression (LessThan l r) = Left $ runLessThan l r
stepExpression (Variable k env) = Left $ runVariable k env

update1 :: (Expression t -> Expression a) -> (t -> Expression a) -> Expression t -> Expression a
update1 onFailure onSuccess x = either onFailure onSuccess (stepExpression x)

update2 :: (Expression t1 -> Expression t2 -> Expression a) -> (t1 -> t2 -> Expression a) -> Expression t1 -> Expression t2 -> Expression a
update2 onFailure onSuccess l r = parseLeft
  where
    parseLeft = update1 updateLeft parseRight l
    parseRight x = update1 updateRight (onSuccess x) r
    updateLeft x = onFailure x r
    updateRight = onFailure l

runAdd :: (Num a) => Expression a -> Expression a -> Expression a
runAdd = update2 Add (\x y -> Number $ x + y)

runMultiply :: (Num a) => Expression a -> Expression a -> Expression a
runMultiply = update2 Multiply (\x y -> Number $ x * y)

runIf :: Expression Bool -> Expression a -> Expression a -> Expression a
runIf p l r = update1 updateFirst wrapOperation p
  where updateFirst x = If x l r
        wrapOperation x = if x then l else r

runLessThan :: (Ord a, Show a) => Expression a -> Expression a -> Expression Bool
runLessThan = update2 LessThan wrapOperation
  where wrapOperation x y = Boolean (x < y)

runVariable :: Key -> Environment a -> Expression a
runVariable k env = Maybe.fromJust (Map.lookup k env)
