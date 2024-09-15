

  import { BrowserRouter, Routes, Route } from 'react-router-dom'
  import ProgressBar from './components/ProgressBar'
  import Navbar from './components/Navbar/page'
  import PortfolioHero from './components/Hero/page'
  import AboutSection from './components/About/page'
  import CustomROMProductsPage from './pages/products/page'
  import AvailableROMsPage from './pages/products/[codename]/page'
  import ROMDetailsPage from './pages/products/[codename]/[romName]/page'
  import ContactPage from './pages/contact/page'
  import SupportSection from './pages/Support/Support'
  import ScrollToTop from './hooks/scrollFix'
  import FeedbackButton from './components/FeedbackButton'
  import './App.css'

  function App() {
    return (
      <>
        <BrowserRouter>
        <ScrollToTop/>
        <ProgressBar/>
         <FeedbackButton/>
          <Navbar/>
          <Routes>
            <Route path="/" element={
              <>
                <PortfolioHero/>
                <AboutSection/>
                
              </>
            } />
            <Route path="/products" element={<CustomROMProductsPage/>} />
            <Route path="/products/:codename" element={<AvailableROMsPage/>} />
            <Route path="/products/:codename/:romName" element={<ROMDetailsPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/support" element={<SupportSection/>} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }

  export default App