'use client';

import Link from 'next/link';
import { ArrowLeft, Film, Tv, Gamepad, BookOpen, Quote } from 'lucide-react';
import styles from './stash.module.css';

const ANIME = [
  "One Piece", "Attack on Titan", "My Hero Academia", "Jujutsu Kaisen", 
  "Black Clover", "Hunter x Hunter", "One Punch Man", "Hell's Paradise", 
  "Chainsaw Man", "Demon Slayer"
];

const MOVIES = [
  "Inception", "The Matrix", "Interstellar", "Dune", "Project Hail Mary", 
  "Wolf of Wall Street", "Harry Potter", "Marvel Cinematic Universe", 
  "Terminator 1", "The Lion King", "Wall-E", "12th Fail", "Your Name", "Joker"
];

const GAMES = [
  "eFootball", "Valorant", "FPS Games", "Need for Speed", "BGMI", 
  "Clash of Clans", "Chess"
];

const BLOGS = [
  "XDA Developers", "VirtualizationHowTo", "How-To Geek", "daily.dev", "MakeUseOf"
];

export default function StashPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <Link href="/" className={styles.back}>
          <ArrowLeft size={16} />
          Back home
        </Link>
        
        <h1 className={`headline-xl ${styles.heading}`}>
          My <span className="gradient-text">Stash</span>
        </h1>
        <p className={`body-lg ${styles.subheading}`}>
          A collection of things I enjoy when I'm not writing code. 
          Anime, movies, games, and the blogs that keep me curious.
        </p>

        <div className={styles.grid}>
          {/* Anime Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Tv size={24} className={styles.icon} />
              <h2>Anime</h2>
            </div>
            <div className={styles.tagCloud}>
              {ANIME.map(a => <span key={a} className={styles.tag}>{a}</span>)}
            </div>
          </div>

          {/* Movies Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Film size={24} className={styles.icon} />
              <h2>Cinema</h2>
            </div>
            <div className={styles.tagCloud}>
              {MOVIES.map(m => <span key={m} className={styles.tag}>{m}</span>)}
            </div>
          </div>

          {/* Games Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Gamepad size={24} className={styles.icon} />
              <h2>Gaming</h2>
            </div>
            <div className={styles.tagCloud}>
              {GAMES.map(g => <span key={g} className={styles.tag}>{g}</span>)}
            </div>
          </div>

          {/* Blogs Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <BookOpen size={24} className={styles.icon} />
              <h2>Reading</h2>
            </div>
            <ul className={styles.list}>
              {BLOGS.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>

          {/* Fun Fact Card (Bento Style) */}
          <div className={`${styles.card} ${styles.bentoCard}`}>
            <div className={styles.cardHeader}>
              <Quote size={24} className={styles.icon} />
              <h2>Fun Fact</h2>
            </div>
            <p className={styles.quote}>
              "Skateboard dost ka hai 😁"
            </p>
            <p className={styles.quoteSub}>
              (The skateboard belongs to my friend 😁)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
