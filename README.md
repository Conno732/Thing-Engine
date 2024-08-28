# Thing-Engine
In browser game engine


## Components
- rendering 
      - 2d / 3d rendering
      - webgl, we are leveraging the GPU
      - shaders/lighting model (we'll worry about this later)
      -  blin phong ??? simple for now!!!
      -  make shaders extensible
            - provide shader editor (game engine responsibility)
      - Text and UI components
           - ui component lib
          
- physics
      - 2d / 3d physics
      - might write my own, probably create interface layer/wrapper around a premade physics engine in interim
             - extensible for multiple engine types
      -  can we leverage gpu to calculate physics? probably not, but we'll see
      
      
- Game Engine
   - what is the state of the world. 
             - collection of things
             - game logic 'user created scripts'
                 - provide an api for extension, NOT modification 
   - UI 
      - scene view 
      - inspect objects
      - asset managing 
      - scene management
      - script ide (might just import a text writing lib) 
      - built on 2d ui components 
      - DEPEDENT ON 2D COMPONENT LIB
      

  - Input management
     - keyboard/mouse for now
     - controller mapping????
 
WARNING THIS IS FUN STUFF THAT IS ONLY NICE TO HAVE
 
- game publishing website
    - people can upload games
     - rating systems
    - go crazy!!!!
 

next steps:
 - decide our tech stack
 - get setup with our environment
- CODING!!!!!






