'use client'
import styles from '@/styles/about.module.css';

export default function AboutHeader(data:{text:string}){
    return (
        <div className={styles.header}>
            <p>{data.text}</p>
        </div>
    )
}