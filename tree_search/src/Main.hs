module Main (main, run) where

import Data.List

import Problem
import Search

data State = State { x :: Int, y :: Int } deriving (Eq)

instance Show State where
  show (State x0 y0) = show (x0, y0)

initialActions :: [Action State]
initialActions = [ moveX, moveY ]
  where moveX s = filter isValidState [ s { x = x s + 1 }, s { x = x s + 2 } ]
        moveY s = filter isValidState [ s { y = y s + 1 }, s { y = y s + 2 } ]

isValidState :: State -> Bool
isValidState s = and [
  x s >= 0,
  x s < 5,
  y s >= 0,
  y s < 5
  ]

initialGoal :: State -> Bool
initialGoal s = x s == 2 && y s == 4

thisProblem :: Problem State
thisProblem = Problem {
  initialState = State { x = 0, y = 0 },
  actions = initialActions,
  goalTest = initialGoal
}

valuate :: Node State -> Int
valuate = sq . state

sq :: State -> Int
sq s = x s * x s + y s * y s

thisStrategy :: [Node State] -> Node State
thisStrategy = head . sortOn valuate

run :: [Path State]
run = search thisProblem thisStrategy

main :: IO ()
main = do
  let result = run
  print result
