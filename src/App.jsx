import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import Navigation from './components/Navigation/Navigation.jsx'
import Logo from './components/Logo/Logo.jsx'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx'
import Rank from './components/Rank/Rank.jsx'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx'
import SignIn from './components/SignIn/SignIn.jsx'
import Register from './components/Register/Register.jsx'
import './App.css'

const App = () => {
  const [init, setInit] = useState(false)
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [box, setBox] = useState({})
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  })

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    })
    console.log(data) // debugging purpose
  }

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

const onButtonSubmit = () => {
  setImageUrl(input);

  fetch('https://face-recognition-backend-znpe.onrender.com/clarifai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: input }),
  })
    .then(response => response.json())
    .then(result => {
      if (result) {
        fetch('https://face-recognition-backend-znpe.onrender.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: user.id }),
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(prev => ({
              ...prev,
              entries: data
            }));
          })
          .catch(console.log);
      }

      const regions = result.outputs?.[0]?.data?.regions;

      if (regions && regions.length > 0) {
        const boundingBox = regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);

        const box = {
          leftCol: boundingBox.left_col * width,
          topRow: boundingBox.top_row * height,
          rightCol: width - boundingBox.right_col * width,
          bottomRow: height - boundingBox.bottom_row * height,
        };

        setBox(box);
      }
    })
    .catch((error) => console.log('Error:', error));
};


  const onRouteChange = (newRoute) => {
  if (newRoute === 'signout') {
    setIsSignedIn(false)
    setInput('')
    setImageUrl(null)
    setBox({})
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    })
    setRoute('signin')
    return
  } else if (newRoute === 'home') {
    setIsSignedIn(true)
  }
  setRoute(newRoute)
}

return (
  <div className="App">
    {init && (
      <Particles
        className="particles"
        id="tsparticles"
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: 'push' },
              onHover: { enable: true, mode: 'repulse' },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: '#ffffff' },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: { default: 'bounce' },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 100,
            },
            opacity: { value: 0.5 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
      />
    )}

    <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />

    {route === 'signin' 
    ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
    : route === 'register'
    ? <Register onRouteChange={onRouteChange} loadUser={loadUser} />
    : (
      <div className='home-transition'>
        <Logo />
        <Rank name={user.name} entries={user.entries} />
        <ImageLinkForm
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
        />
        <FaceRecognition imageUrl={imageUrl} box={box} />
      </div>
    )}
  </div>
)

}

export default App