import styles from './HomePage.module.css'
import usersLogo from './assets/UsersLogo.jpg'
import productsLogo from './assets/productsLogo.png'
import reviewsLogo from './assets/reviewsLogo.png'

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePageWrapper}>
      <section className={styles.mainSection}>
        <h1>Welcome to Our Platform!</h1>
        <p>Discover amazing products, connect with users, and more...</p>
        <div className={styles.buttonsWrap}>
          <a href="/Users" className={styles.styledButton}>Explore Users</a>
          <a href="/Products" className={styles.styledButton}>Browse Products</a>
        </div>
      </section>
      <section className={styles.secondarySection}>
        <div className="card" style={{width: '18rem'}}>
          <img src={usersLogo} alt="user-logo" className='class="card-img-top"' style={{height:'250px', objectFit:'cover'}}/>
          <div className="card-body">
            <h2>Users</h2>
            <p className="card-text">Connect with a community of users and share your experiences.</p>
          </div>
        </div>
        <div className="card" style={{width: '18rem'}}>
          <img src={productsLogo} alt="product-logo" className='class="card-img-top"' style={{height:'250px', objectFit:'cover'}}/>
          <div className="card-body">
            <h2>Products</h2>
            <p className="card-text">Explore a variety of products to find what suits you best.</p>
          </div>
        </div>
        <div className="card" style={{width: '18rem'}}>
          <img src={reviewsLogo} alt="reviews-logo" className='class="card-img-top"' style={{height:'250px', objectFit:'cover'}}/>
          <div className="card-body">
            <h2>Reviews</h2>
            <p className="card-text">Check out reviews and see what others think before purchasing.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
