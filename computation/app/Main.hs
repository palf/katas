module Main (main) where

import Reducible
import Expression

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
