




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CiMenuFries } from "react-icons/ci";

const NavItem = ({ to, children, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to={to}
      onClick={onClick}
      className="text-white hover:text-green-500 transition-colors duration-200"
    >
      {children}
    </Link>
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = 'https://firebasestorage.googleapis.com/v0/b/react-98765.appspot.com/o/assets%2Fme.jpg?alt=media&token=b955e7b3-74ae-4169-bc6c-a984a6aeab3c';
    image.onload = () => setIsLoading(false);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/support', label: 'Support' },
    { href: '/contact', label: 'Contact' },
   
  ];

  const menuVariants = {
    closed: {
      scale: 0,
      opacity: 0,
      transformOrigin: 'top right',
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <nav className="bg-black w-full z-50 fixed top-0">
      <div className="max-w-9xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <div className="relative h-10 w-10  mr-2">
              {isLoading ? (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-gray-300 rounded-full"
                />
              ) : (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src="https://firebasestorage.googleapis.com/v0/b/react-98765.appspot.com/o/assets%2Fme.jpg?alt=media&token=b955e7b3-74ae-4169-bc6c-a984a6aeab3c"
                  alt="Me"
                  className="rounded-full w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <p className="text-white font-bold text-2xl">Hackneyed</p>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex text-dark items-baseline space-x-4">
              {menuItems.map((item) => (
                <NavItem key={item.href} to={item.href}>{item.label}</NavItem>
              ))}
            </div>
          </div>
          <div className="md:hidden bg-black">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded"
            >
              <span className="sr-only">Toggle main menu</span>
              {/* {isOpen ? <X className="h-6 w-6 text-white p-8" /> : <Menu className="h-6 w-6 text-white" />} */}
              <CiMenuFries className="h-6 w-6 text-white active:text-green-500" />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence >
  {isOpen && (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
      className="md:hidden fixed inset-0 bg-black z-50 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="text-gray-400 hover:text-green-500"
          >
            <X className="h-8 w-8 mr-3" />
          </motion.button>
        </div>
        <motion.div
          variants={{
            open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
          }}
          className="flex-grow flex flex-col text-dark items-center justify-center space-y-8 mb-32"
        >
          <h2 className='text-3xl text-green-500'>Menu</h2>
          {menuItems.map((item) => (
            <motion.div
              key={item.href}
              variants={{
                open: { opacity: 1, y: 0 },
                closed: { opacity: 0, y: 20 }
              }}
            >
              <NavItem to={item.href} onClick={toggleMenu}>
                <span className="text-3xl">{item.label}</span>
              </NavItem>
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </nav>
  );
};

export default Navbar;