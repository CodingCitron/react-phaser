import React, { useEffect, useRef } from 'react'

import { useGame } from '../hooks/useGame'
import gameConfig from '../game'

const Landing = () => {
  const gameContainer = useRef<HTMLDivElement>(null) 
  useGame(gameConfig, gameContainer)

  return (
    <div ref={gameContainer}></div>
  )
}

export default Landing