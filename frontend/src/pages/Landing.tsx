import React, { useRef, useEffect } from 'react'

import { useGame } from '../hooks/useGame'
import gameConfig from '../game'

import { resume } from '../game/utils/pauseManager'

const Landing = () => {
  const gameContainer = useRef<HTMLDivElement>(null) 
  const game = useGame(gameConfig, gameContainer)

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)

    function keydownHandler(e: KeyboardEvent) {
      resume(e, game as Phaser.Game)
    }

    return () => {
      document.removeEventListener('keydown', keydownHandler)
    }
  }, [game])
  

  return (
    <div 
      ref={gameContainer}
    >
    </div>
  )
}

export default React.memo(Landing)