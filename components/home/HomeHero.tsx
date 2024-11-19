import styles from '@/styles/reuseable.module.css';
export default function HomeHero() {
    return (
            <div className={'flex flex-col lg:flex-row md:gap-[20px]'}>
                <div className={styles.homeHeroParent}>
                    <p className={styles.relax}>Relax & unwind</p>
                    <p className={styles.experience}>Experience the luxurious level</p>
                    <p className={styles.treatment}>of our spa treatments</p>
                </div>
            </div>

    );
}
