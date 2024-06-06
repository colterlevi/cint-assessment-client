import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import railsLogo from '../assets/Ruby_On_Rails_Logo.svg'
import typescriptLogo from '../assets/Typescript_logo_2020.svg'
import framerLogo from '../assets/framer-motion.svg'
import routerLogo from '../assets/react-router-mark-color.svg'
import tailwindLogo from '../assets/Tailwind_CSS_Logo.svg'

const Footer: React.FC = () => {

    return (
        <footer className='bg-white shadow-md'>
            <div className='mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8'>
                <div className="flex justify-evenly items-center text-sm">
                    <p className='text-xl font-semibold text-red-400'>Built with:</p>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className='' alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className='' alt="React logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={tailwindLogo} className='' alt="TailwindCSS logo" />
                    </a>
                    <a href="https://rubyonrails.org" target="_blank">
                        <img src={railsLogo} className='' alt="Ruby on Rails logo" />
                    </a>
                    <a href="https://www.typescriptlang.org" target="_blank">
                        <img src={typescriptLogo} className='' alt="Typescript logo" />
                    </a>
                    <a href="https://www.framer.com/motion" target="_blank">
                        <img src={framerLogo} className='' alt="Framer-Motion logo" />
                    </a>
                    <a href="https://reactrouter.com/en/main" target="_blank">
                        <img src={routerLogo} className='' alt="React Router logo" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer