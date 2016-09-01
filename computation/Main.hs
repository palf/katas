module Main (main) where

class Reducible a where
  isReducible :: a -> Bool
  reduce :: a -> a

data Expression a
  = Number a
  | Add (Expression a) (Expression a)
  | Multiply (Expression a) (Expression a)
  | If (Expression Bool) (Expression a) (Expression a)
  | T
  | F
  | Not (Expression Bool)
  | LessThan (Expression a) (Expression a)

instance (Show a) => Show (Expression a) where
  show (Number x) = show x
  show (Add l r) = show l ++ " + " ++ show r
  show (Multiply l r) = "(" ++ show l ++ " * " ++ show r ++ ")"
  show (If p l r) = "(if:" ++ show p ++ " then:" ++ show l ++ " else:" ++ show r ++ ")"
  show (Variable x) = "var:" ++ show x
  show T = "T"
  show F = "F"
  show (Not p) = "(not:" ++ show p ++ ")"
  show (And l r) = "(" ++ show l ++ " :and " ++ show r ++ ")"
  show (LessThan l r) = "(lt:" ++ show l ++ "," ++ show r ++ ")"

instance (Num a, Ord a) => Reducible (Expression a) where
  isReducible (Number _) = False
  isReducible T = False
  isReducible F = False
  isReducible _ = True
  reduce = stepExpression

stepExpression :: (Num a, Ord a) => Expression a -> Expression a
stepExpression (Number x) = Number x
stepExpression (Add l r)
  | isReducible l = Add (stepExpression l) r
  | isReducible r = Add l (stepExpression r)
  | otherwise     = Number (evalExpression $ Add l r)
stepExpression (Multiply l r)
  | isReducible l = Multiply (stepExpression l) r
  | isReducible r = Multiply l (stepExpression r)
  | otherwise     = Number (evalExpression $ Multiply l r)
stepExpression (If p l r)
  | isReducible p   = If (stepExpression p) l r
  | evalExpression p = l
  | otherwise       = r
stepExpression (Variable x) = Variable x
stepExpression T = T
stepExpression F = F
stepExpression (Not p)
  | isReducible p = Not (stepExpression p)
  | otherwise     = runNot p
  where runNot T = F
        runNot F = T
stepExpression (And l r)
  | isReducible l = And (stepExpression l) r
  | isReducible r = And l (stepExpression r)
  | otherwise     = runAnd l r
  where runAnd T T = T
        runAnd _ _ = F
stepExpression (LessThan l r)
  | isReducible l = LessThan (stepExpression l) r
  | isReducible r = LessThan l (stepExpression r)
  | otherwise     = runLessThan l r
  where runLessThan l r | evalExpression (LessThan l r) = T | otherwise = F

evalExpression :: (Num a, Ord a) => Expression a -> a
evalExpression (Number x) = x
evalExpression (Add l r) = (evalExpression l) + (evalExpression r)
evalExpression (Multiply l r) = (evalExpression l) * (evalExpression r)
evalExpression (If p l r)
  | evalExpression p = evalExpression l
  | otherwise = evalExpression r
evalExpression T = True
evalExpression F = False
evalExpression (Not p) = not (evalExpression p)
evalExpression (And l r) = (evalExpression l) && (evalExpression r)
evalExpression (LessThan l r) = (evalExpression l) < (evalExpression r)

runWithM :: (Monad m, Num a, Ord a, Show a) => Expression a -> (Expression a -> m b) -> m ()
runWithM expression operation = do
  operation expression
  let expression' = stepExpression expression
  if isReducible expression'
      then runWithM expression' operation
      else do
        operation expression'
        return ()

someExpression :: Expression Int
someExpression = Add left right
  where left = If (predicate) (Multiply l1 l2) (Multiply l2 r1)
        predicate = Not comparison
        comparison = LessThan r2 r1
        l1 = Number 1
        l2 = Number 2
        right = Multiply r1 r2
        r1 = Number 3
        r2 = Number 4

main :: IO ()
main = do
  runWithM someExpression print
