module Problem where

data Node a = Node {
  state :: a,
  parent :: Maybe (Node a)
} deriving (Eq)

instance (Show a) => Show (Node a) where
  show node = show (state node)

type Visited a = [Node a]
type Fringe a = [Node a]
type Path a = [Node a]

type Strategy a = [Node a] -> Node a
type Action a = a -> [a]

data Problem a = Problem {
  initialState :: a,
  actions :: [Action a],
  goalTest :: a -> Bool
}
