module Reducible (
  Reducible(..),
  stepReduceM
) where

class Reducible t where
  step :: t a -> Either (t a) a
  reduce :: t a -> a


stepReduceM :: (Monad m, Reducible t) => t a -> (t a -> m b) -> m ()
stepReduceM box op = do
  op box
  either (flip stepReduceM $ op) (void) (step box)
    where void x = return ()
