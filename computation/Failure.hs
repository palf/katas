module Main where

data Expression a
  = Number a
  | Add (Expression a) (Expression a)
  | Multiply (Expression a) (Expression a)

instance (Show a) => Show (Expression a) where
  show (Number x) = "(n: " ++ show x ++ ")"
  show (Add l r) = "(add: " ++ show l ++ ", " ++ show r ++ ")"
  show (Multiply l r) = "(multiply: " ++ show l ++ ", " ++ show r ++ ")"

step :: (Num a) => Expression a -> Either (Expression a) a
step (Number x) = Right x
step (Add l r) = Left $ runAdd l r
step (Multiply l r) = Left $ runMultiply l r

update1 :: (Num t) => (Expression t -> Expression a) -> (t -> a) -> Expression t -> Expression a
update1 key f x1 = parseFirst
  where
    parseFirst = either (updateFirst) (wrapOperation) (step x1)
    updateFirst x = key x
    wrapOperation x = Number (f x)

update2 :: (Num t1, Num t2) => (Expression t1 -> Expression t2 -> Expression a) -> (t1 -> t2 -> a) -> Expression t1 -> Expression t2 -> Expression a
update2 key f l r = parseLeft
  where
    parseLeft = either (updateLeft) (parseRight) (step l)
    parseRight x = either (updateRight) (wrapOperation x) (step r)
    updateLeft x = key x r
    updateRight x = key l x
    wrapOperation x y = Number (f x y)

runAdd :: (Num a) => Expression a -> Expression a -> Expression a
runAdd = update2 Add (+)

runMultiply :: (Num a) => Expression a -> Expression a -> Expression a
runMultiply = update2 Multiply (*)

reduce :: (Num a) => Expression a -> a
reduce (Number x) = x
reduce e = either reduce id (step e)

someExpression :: Expression Int
someExpression = x6
  where x1 = Number 5
        x2 = Number 3
        x3 = Number 2
        x4 = Add x2 x3
        x5 = Add x1 x4
        x6 = Multiply x4 x5

main :: IO ()
main = do
  print someExpression
  print $ step someExpression
  print $ reduce someExpression
