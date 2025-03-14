import styles from './HomePage.module.css'

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
        <div className={styles.secodarySectionItem}>
          <h2>Users</h2>
          <p>Connect with a community of users and share your experiences.</p>
        </div>
        <div className={styles.secodarySectionItem}>
          <h2>Products</h2>
          <p>Explore a variety of products to find what suits you best.</p>
        </div>
        <div className={styles.secodarySectionItem}>
          <h2>Reviews</h2>
          <p>Check out reviews and see what others think before purchasing.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
