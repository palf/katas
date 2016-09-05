module Reducible (
  Reducible(..)
) where

class Reducible t where
  step :: t a -> Either (t a) a
  reduce :: t a -> a
