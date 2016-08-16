module Search (search) where

import Problem

type StepData a = (Visited a, Fringe a, [Node a])

selectFrom :: Fringe a -> Strategy a -> Node a
selectFrom fringe strategy = strategy fringe

pathTo' :: Maybe (Node a) -> Path a
pathTo' Nothing = []
pathTo' (Just node) = node : pathTo' (parent node)

pathTo :: Node a -> Path a
pathTo node = reverse $ pathTo' (Just node)

expand :: Problem a -> Node a -> [Node a]
expand problem node = map (\nodeState -> Node { state = nodeState, parent = Just node }) states
  where states = applyActions (state node) (actions problem)

applyActions :: a -> [Action a] -> [a]
applyActions s0 = concatMap (\action -> action s0)

exploreFringe :: (Eq a) => Problem a -> Strategy a -> StepData a -> StepData a
exploreFringe problem strategy (visited, fringe, solutions)
  | node `elem` visited = (visited, fringeWithoutNode, solutions)
  | otherwise           = stepSearch problem node (visited, fringeWithoutNode, solutions)
  where node = selectFrom fringe strategy
        fringeWithoutNode = filter (/= node) fringe

stepSearch :: Problem a -> Node a -> StepData a -> StepData a
stepSearch problem node (visited, fringe, solutions) = (node : visited, newFringe, newSolutions)
  where expansion = expand problem node
        newFringe = fringe ++ expansion
        newSolutions = solutions ++ filter test expansion
        test node' = goalTest problem (state node')

applyStep :: (StepData a -> StepData a) -> StepData a -> [Path a]
applyStep _ (_, [], solutions) = map pathTo solutions
applyStep step d = applyStep step (step d)

search :: (Eq a) => Problem a -> Strategy a -> [Path a]
search problem strategy = applyStep step s0
  where s0 = ([], [node0], [])
        node0 = Node { state = initialState problem, parent = Nothing }
        step = exploreFringe problem strategy
