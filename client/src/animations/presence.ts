const animationsPresence = {
  scale: `@keyframes presenceScale {
                from{ opacity: 0; transform: scale(0) }
                to{ opacity: 1; transform: scale(1) }
            }
            animation: presenceScale .3s ease-in;`,
  translateRight: `@keyframes transition {
                        from { opacity: 0; transform: translateX(100%); }
                        to { opacity: 1; transform: translateX(0); } 
                    }
                    animation: transition .3s ease-in-out;`,
}

export default animationsPresence
