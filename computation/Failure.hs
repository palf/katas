module Main where

data Expression a
  = Number a
  | Add (Expression a) (Expression a)

instance (Show a) => Show (Expression a) where
  show (Number x) = show x
  show (Add l r) = "(add: " ++ show l ++ ", " ++ show r ++ ")"

step :: (Num a) => Expression a -> Either (Expression a) a
step (Number x) = Right x
step (Add l r) = Left $ runAdd l r

huh :: (Num a) => Expression a -> Expression a
huh x = either (id) (Number) (step x)

runAdd :: (Num a) => Expression a -> Expression a -> Expression a
runAdd (Number l) (Number r) = Number (l + r)
runAdd (Number l) r = Add (Number l) (huh r)
runAdd l r = Add (huh l) r

runAdd' :: (Num a) => Expression a -> Expression a -> Either (Expression a) (Expression a)
runAdd' l r = step l >>= \x -> step r >>= \y -> return $ Number $ x + y

reduce :: (Num a) => Expression a -> a
reduce (Number x) = x
reduce e = either reduce id (step e)

someExpression :: Expression Int
someExpression = x6
  where x1 = Number 5
        x2 = Number (-1)
        x3 = Number 2
        x4 = Add x2 x3
        x5 = Add x1 x4
        x6 = Add x4 x5

main :: IO ()
main = do
  print someExpression
  print $ step someExpression
  print $ huh $ huh someExpression
  print $ reduce someExpression
