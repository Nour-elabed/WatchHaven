
import Collections from '@/components/Collections'
import Hero from '@/components/Hero'
import Recommendations from '@/components/Recommendations'
import BestSellers from '@/components/BestSellers'
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
 type User = {
  _id: string
  username: string
  email: string
  token: string
}

type HomeProps = {
  user: User | null
  error: string | null
}
const Home = ({user, error}: HomeProps) => {
  return (
    <div>
        
        <Hero/>
        <Collections/>
        <Recommendations/>
        <BestSellers/>
        <Banner/>
        <Footer/>
        {error && <p className="text-red-400 mb-4 text-center text-sm">{error}</p>}
        {user ? (
          <div>
            <h2>{user.username}</h2>
            <p>{user.email}</p>

          </div>
        ): <div>

        </div>
      }
    </div>
  )
}

export default Home
