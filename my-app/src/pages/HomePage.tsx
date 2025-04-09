import Layout from '../components/Layout'
import CompanyDetailsCard from '../components/Card/CompanyDetailsCard'
import ContactsCard from '../components/Card/ContactsCard'
import PhotosCard from '../components/Card/PhotosCard'

const HomePage = () => (
  <Layout>
    <CompanyDetailsCard />
    <ContactsCard />
    <PhotosCard />
  </Layout>
)

export default HomePage
