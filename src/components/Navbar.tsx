import { useState } from 'react';
import { Menu, X, Home, User, Settings, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: 'Home', icon: <Home className="w-5 h-5" /> },
    { title: 'Profile', icon: <User className="w-5 h-5" /> },
    { title: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { title: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.nav 
      className="bg-[#2A3439] shadow-lg rounded-3xl mt-4 max-w-4xl mx-auto px-4 bg-gradient-to-t sticky top-4 z-50 flex leading-none  drop-shadow-[4px_4px_10px_rgba(0,0,0,0.75)]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className=" mx-auto px-4">
        <div className="flex justify-between h-16">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 py-2 rounded-md text-white hover:text-gray-900 transition-colors"
              >
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.div 
            className="md:hidden flex items-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden py-4"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div 
                className="flex flex-col space-y-2"
                variants={containerVariants}
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;