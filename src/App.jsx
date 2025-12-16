import React, { useState, useEffect } from 'react';
import { Star, Rocket, Trophy, Flame, Check, X, ArrowRight, Lock, Award, TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react';

const App = () => {
  const [scene, setScene] = useState('crawl');
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [unlockedMissions, setUnlockedMissions] = useState([1]); // IDs of unlocked planets

  // Mission state
  const [currentMissionId, setCurrentMissionId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [missionResults, setMissionResults] = useState(null);
  const [showParticles, setShowParticles] = useState(false);
  const [unlockedPlanetId, setUnlockedPlanetId] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [randomizedMissionData, setRandomizedMissionData] = useState(null);

  // Pre-process mission data to vary correct answer positions across all missions
  useEffect(() => {
    const processData = async () => {
      const randomized = {};
      for (const [missionId, mission] of Object.entries(missionData)) {
        randomized[missionId] = {
          ...mission,
          questions: mission.questions.map(q => {
            // Shuffle options to ensure correct answer isn't always in the same position
            const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
            // Find the new position of the correct answer after shuffle
            const newCorrectIndex = shuffledOptions.indexOf(q.correct);
            return {
              ...q,
              options: shuffledOptions,
              // If shuffle moved the correct answer, keep it the same string, as position varies
              // The correct property remains the string
            };
          })
        };
      }
      setRandomizedMissionData(randomized);
    };

    processData();
  }, []);

  // --- DATASETS ---
  const missionData = {
    1: { // Tatooine - Character Forge
      title: 'Character Forge',
      questions: [
        {
          character: 'Luke Skywalker',
          role: 'Jedi Knight who destroyed the Death Star',
          icon: '⚔️',
          question: 'Luke faced Darth Vader and the Emperor without fear. He was ___ to face the Empire.',
          options: ['brave', 'boring', 'lazy'],
          correct: 'brave',
          fact: 'Hero who saved the galaxy in Return of the Jedi'
        },
        {
          character: 'Princess Leia',
          role: 'Rebel Leader who organized the resistance',
          icon: '👑',
          question: 'Leia outsmarted the Empire by hiding the Death Star plans in R2-D2. She was very ___.',
          options: ['smart', 'boring', 'lazy'],
          correct: 'smart',
          fact: 'Organized the Rebel rescue on Scarif'
        },
        {
          character: 'Yoda',
          role: 'Jedi Master who trained Luke',
          icon: '🧙',
          question: 'Yoda lifted Luke\'s X-Wing from the swamp using only his wisdom. He was incredibly ___.',
          options: ['wise', 'lazy', 'boring'],
          correct: 'wise',
          fact: 'Ancient Jedi Master defeated by Emperor Palpatine'
        },
        {
          character: 'Han Solo',
          role: 'Smuggler who flew the Millennium Falcon',
          icon: '🚀',
          question: 'Han shot open the trash compactor on the Death Star with his blaster. He was ___.',
          options: ['clever', 'boring', 'lazy'],
          correct: 'clever',
          fact: 'Smuggler turned hero who defeated the First Order'
        },
        {
          character: 'Chewbacca',
          role: 'Wookiee warrior who fought with Han',
          icon: '🐻',
          question: 'Chewie carried C-3PO to safety while being shot at by stormtroopers. He was ___.',
          options: ['loyal', 'lazy', 'boring'],
          correct: 'loyal',
          fact: 'Freed Han from Jabba\'s palace on Tatooine'
        },
        {
          character: 'Rey',
          role: 'Jedi scavenger who defeated Kylo Ren',
          icon: '⭐',
          question: 'Rey fought Kylo Ren without any Jedi training and defeated Snoke. She was ___.',
          options: ['strong', 'lazy', 'boring'],
          correct: 'strong',
          fact: 'Found Luke Skywalker using the Jedi compass'
        }
      ]
    },
    2: { // Naboo - Emotion Detector
      title: 'Emotion Detector',
      questions: [
        {
          scenario: 'Obi-Wan saw Anakin turn to the dark side',
          context: 'He couldn\'t believe his apprentice betrayed the Jedi',
          icon: '😢',
          question: 'How did Obi-Wan feel?',
          options: ['sad', 'happy', 'bored'],
          correct: 'sad'
        },
        {
          scenario: 'Darth Vader discovered Luke was his son',
          context: 'He never expected this revelation',
          icon: '😲',
          question: 'How did Vader feel?',
          options: ['surprised', 'bored', 'tired'],
          correct: 'surprised'
        },
        {
          scenario: 'Kylo Ren couldn\'t defeat Rey in battle',
          context: 'He lost control and destroyed the room',
          icon: '😠',
          question: 'How did Kylo Ren feel?',
          options: ['angry', 'excited', 'happy'],
          correct: 'angry'
        },
        {
          scenario: 'R2-D2 watched while C-3PO told the same story again',
          context: 'He had heard it a thousand times',
          icon: '😑',
          question: 'How did R2-D2 feel?',
          options: ['bored', 'excited', 'worried'],
          correct: 'bored'
        },
        {
          scenario: 'Luke trained all day with Yoda on Dagobah',
          context: 'He could barely lift his lightsaber',
          icon: '😴',
          question: 'How did Luke feel?',
          options: ['tired', 'excited', 'angry'],
          correct: 'tired'
        },
        {
          scenario: 'Leia saw her home planet Alderaan destroyed',
          context: 'The Empire had blown it up completely',
          icon: '😰',
          question: 'How did Leia feel?',
          options: ['worried', 'happy', 'bored'],
          correct: 'worried'
        }
      ]
    },
    3: { // Coruscant - Time Shifter
      title: 'Time Shifter',
      questions: [
        {
          question: 'Complete: Luke ___ (train) with Yoda when he sensed his friends in danger.',
          correct: 'was training',
          options: ['was training', 'were training', 'was train'],
          context: 'A critical moment on Dagobah',
          icon: '⚔️'
        },
        {
          question: 'Complete: The rebels ___ (plan) their attack while the Empire built the Death Star.',
          correct: 'were planning',
          options: ['were planning', 'was planning', 'were plan'],
          context: 'Preparing for the ultimate battle',
          icon: '🎯'
        },
        {
          question: 'Complete: Anakin ___ (fight) Count Dooku when he turned to the dark side.',
          correct: 'was fighting',
          options: ['was fighting', 'were fighting', 'was fight'],
          context: 'The beginning of Vader\'s fall',
          icon: '⚡'
        },
        {
          question: 'Complete: Rey ___ (search) for Luke while the First Order grew stronger.',
          correct: 'was searching',
          options: ['was searching', 'were searching', 'was search'],
          context: 'The quest for the last Jedi',
          icon: '🔍'
        },
        {
          question: 'Complete: Han and Chewie ___ (fly) through the asteroid field while TIE fighters ___ (chase) them.',
          correct: 'were flying / were chasing',
          options: ['were flying / were chasing', 'was flying / was chasing', 'were fly / were chase'],
          context: 'Epic escape from the Empire',
          icon: '🚀'
        },
        {
          question: 'Complete: Padmé ___ (lead) the Senate while Palpatine ___ (plan) his takeover.',
          correct: 'was leading / was planning',
          options: ['was leading / was planning', 'were leading / were planning', 'was lead / was plan'],
          context: 'Political intrigue in the Republic',
          icon: '🏛️'
        }
      ]
    },
    4: { // Endor - History Keeper
      title: 'History Keeper',
      questions: [
        {
          question: 'George Lucas ___ (create) Star Wars and changed cinema forever in 1977.',
          correct: 'created',
          options: ['created', 'create', 'creating'],
          context: 'Birth of a legendary saga',
          icon: '🎬'
        },
        {
          question: 'The Jedi Order ___ (protect) the galaxy for thousands of years.',
          correct: 'protected',
          options: ['protected', 'protect', 'protecting'],
          context: 'Guardians of peace and justice',
          icon: '⚔️'
        },
        {
          question: 'Anakin Skywalker ___ (become) Darth Vader after Order 66.',
          correct: 'became',
          options: ['became', 'become', 'becomes'],
          context: 'The greatest fall from grace',
          icon: '🎭'
        },
        {
          question: 'The Empire ___ (build) two Death Stars to control the galaxy.',
          correct: 'built',
          options: ['built', 'builded', 'build'],
          context: 'Ultimate weapons of destruction',
          icon: '💫'
        },
        {
          question: 'Princess Leia ___ (hide) the Death Star plans in R2-D2.',
          correct: 'hid',
          options: ['hid', 'hide', 'hidden'],
          context: 'A message that started it all',
          icon: '📨'
        },
        {
          question: 'Luke ___ (destroy) the Death Star with one perfect shot.',
          correct: 'destroyed',
          options: ['destroyed', 'destroy', 'destroying'],
          context: 'Victory for the Rebellion',
          icon: '💥'
        },
        {
          question: 'The Skywalker saga ___ (end) after nine epic films.',
          correct: 'ended',
          options: ['ended', 'end', 'ending'],
          context: 'The rise and fall of a dynasty',
          icon: '🌟'
        }
      ]
    },
    5: { // Bespin - Future Plans
      title: 'Cloud City Future',
      questions: [
        {
          question: 'Complete: Lando ___ (help) Han and Leia escape.',
          correct: 'is going to help',
          options: ['is going to help', 'will helping', 'going to help'],
          context: 'A secret plan in the clouds',
          icon: '☁️'
        },
        {
          question: 'Complete: "I ___ (face) my father," Luke said.',
          correct: 'will face',
          options: ['will face', 'going to face', 'face will'],
          context: 'Accepting his destiny',
          icon: '⚔️'
        },
        {
          question: 'Complete: The Empire ___ (take) control of the city.',
          correct: 'will take',
          options: ['will take', 'taking', 'is go take'],
          context: 'Vader\'s deal altered',
          icon: '🏢'
        },
        {
          question: 'Complete: We ___ (save) Han from the bounty hunter!',
          correct: 'are going to save',
          options: ['are going to save', 'will saving', 'going to save'],
          context: 'The rescue mission begins',
          icon: '🚀'
        }
      ]
    },
    6: { // Death Star - The Final Battle
      title: 'Galactic Showdown',
      questions: [
        {
          question: 'If Luke ___ (join) the dark side, the galaxy would be lost.',
          correct: 'joined',
          options: ['joined', 'joins', 'will join'],
          context: 'The Emperor\'s trap',
          icon: '⚡'
        },
        {
          question: 'If the shield generator ___ (fall), we can attack the main reactor.',
          correct: 'falls',
          options: ['falls', 'fell', 'will fall'],
          context: 'The plan to destroy the station',
          icon: '🛡️'
        },
        {
          question: 'Unless Vader ___ (intervene), the Emperor will kill Luke.',
          correct: 'intervenes',
          options: ['intervenes', 'intervene', 'intervened'],
          context: 'The return of the Jedi',
          icon: '🎭'
        },
        {
          question: 'The Death Star will explode if they ___ (hit) the core.',
          correct: 'hit',
          options: ['hit', 'hitting', 'hitted'],
          context: 'One shot, one opportunity',
          icon: '💥'
        }
      ]
    }
  };

  // Star Wars Crawl Scene
  const CrawlScene = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      const showTimer = setTimeout(() => setShow(true), 500);
      const sceneTimer = setTimeout(() => setScene('intro'), 25000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(sceneTimer);
      };
    }, []);

    return (
      <div className="fixed inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/30 via-black to-black"></div>

        {/* Stars */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}>
          <div className="perspective-container">
            <div className="crawl-text">
              <div className="text-yellow-300 text-center space-y-12">
                <p className="text-4xl font-light tracking-[0.3em]">Episode I</p>
                <p className="text-7xl font-bold tracking-[0.5em]">THE ENGLISH</p>
                <p className="text-7xl font-bold tracking-[0.5em]">AWAKENING</p>
                <div className="text-3xl font-light leading-[3rem] max-w-4xl mx-auto pt-20 space-y-12">
                  <p>Welcome to an extraordinary journey through the galaxy of English language mastery.</p>
                  <p>In a universe where words hold the power to change destinies, you are about to embark on an epic quest across distant worlds.</p>
                  <p>Master the ancient arts of adjectives, feelings, and temporal narratives as you travel from planet to planet, rising through the ranks of the Academy.</p>
                  <p>Your starship awaits. Your journey begins now.</p>
                  <p className="text-gray-400 text-2xl pt-20">Developed by Hiram González</p>
                  <p className="text-gray-500 text-xl pt-8">May the Force be with you...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setScene('intro')}
          className="fixed bottom-8 right-8 z-50 px-6 py-3 text-sm text-white/60 hover:text-white border border-white/20 rounded-full hover:border-white/40 transition-all duration-300 backdrop-blur-sm bg-black/20 hover:bg-black/40"
        >
          Skip Intro →
        </button>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .perspective-container {
            perspective: 400px;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .crawl-text {
            position: relative;
            animation: crawl 45s linear;
            transform-origin: 50% 100%;
            transform: rotateX(25deg);
          }
          @keyframes crawl {
            0% { transform: rotateX(25deg) translateY(100vh); }
            100% { transform: rotateX(25deg) translateY(-250vh); }
          }
        `}</style>
      </div>
    );
  };

  // Intro Scene
  const IntroScene = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 100);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="fixed inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-black to-black"></div>

        <div className="absolute inset-0 opacity-30">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-center transition-all duration-[2000ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="relative mb-16">
              <div className="absolute inset-0 blur-3xl">
                <Star className="w-40 h-40 text-yellow-400 mx-auto opacity-50" />
              </div>
              <Star className="relative w-40 h-40 text-yellow-300 mx-auto" style={{
                filter: 'drop-shadow(0 0 60px rgba(253, 224, 71, 0.6))',
                animation: 'rotate 20s linear infinite'
              }} />
            </div>

            <h1 className="text-[7rem] font-light tracking-[0.3em] mb-4 text-white" style={{
              textShadow: '0 0 80px rgba(255, 255, 255, 0.3)'
            }}>
              STAR WARS
            </h1>
            <div className="h-px w-96 mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-8"></div>
            <h2 className="text-3xl font-light text-gray-400 tracking-[0.2em] mb-20">
              ENGLISH ACADEMY
            </h2>

            <button
              onClick={() => setScene('map')}
              className="group relative px-16 py-5 text-lg font-medium text-white border border-white/20 rounded-full overflow-hidden transition-all duration-500 hover:border-yellow-400/50 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative flex items-center gap-3">
                BEGIN TRAINING
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  };

  // Mission Map Scene
  const MissionMap = () => {
    const [visiblePlanets, setVisiblePlanets] = useState([]);
    // Find the latest unlocked planet for initial ship position
    const latestUnlockedId = Math.max(...unlockedMissions);
    const initialPlanet = planets.find(p => p.id === latestUnlockedId) || planets[0];
    const [shipPosition, setShipPosition] = useState({ x: initialPlanet.x, y: initialPlanet.y });

    // EFFECT: Update ship position whenever unlocked missions change or component mounts
    // EFFECT: Ship Animation Logic
    useEffect(() => {
      // Logic: Start at the planet we just played (currentMissionId), then animate to the latest unlocked.
      // If we just started the app (no currentMissionId), start at latest unlocked.

      const latestId = Math.max(...unlockedMissions);
      const targetPlanet = planets.find(p => p.id === latestId);

      // Starting position
      let startPlanet = planets.find(p => p.id === currentMissionId);
      if (!startPlanet) {
        // Fallback if no mission played yet, start at target (no animation)
        startPlanet = targetPlanet;
      }

      if (startPlanet && targetPlanet) {
        // 1. Set initial position to where we were
        setShipPosition({ x: startPlanet.x, y: startPlanet.y });

        // 2. Wait a tick to trigger the transition
        const timer = setTimeout(() => {
          setShipPosition({ x: targetPlanet.x, y: targetPlanet.y });
        }, 100);

        return () => clearTimeout(timer);
      }
    }, []); // Run ONCE on mount using the current state refs

    useEffect(() => {
      const timer = setTimeout(() => {
        planets.forEach((planet, idx) => {
          setTimeout(() => {
            setVisiblePlanets(prev => [...prev, planet.id]);
          }, idx * 400);
        });
      }, 500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-950/20 via-black to-black"></div>
        <div className="absolute inset-0 opacity-40">
          {[...Array(300)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 0.5}px`,
                height: `${Math.random() * 2 + 0.5}px`,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* HUD */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-12 py-6 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Rocket className="w-6 h-6 text-cyan-400" />
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Level</span>
                  <span className="font-medium text-xl text-yellow-400">{level}</span>
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000"
                      style={{ width: `${(xp % 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-500 text-xs">{xp % 100}/100</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="font-medium">{streak}</span>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="font-medium">{score} / {xp} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative pt-32 pb-24" style={{ minHeight: '100vh' }}>
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light tracking-wide mb-4 text-white">
              Galaxy Map
            </h1>
            <p className="text-gray-400 text-lg">Select a planet to begin your mission</p>
          </div>

          <div className="relative mx-auto" style={{ width: '90vw', height: '120vh', maxWidth: '1800px' }}>
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="pathGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(96, 165, 250, 0.2)" />
                  <stop offset="50%" stopColor="rgba(168, 85, 247, 0.2)" />
                  <stop offset="100%" stopColor="rgba(236, 72, 153, 0.2)" />
                </linearGradient>
              </defs>
              {planets.slice(0, -1).map((planet, idx) => {
                const next = planets[idx + 1];
                return (
                  <line
                    key={idx}
                    x1={`${planet.x}%`}
                    y1={`${planet.y}%`}
                    x2={`${next.x}%`}
                    y2={`${next.y}%`}
                    stroke="url(#pathGlow)"
                    strokeWidth="2"
                    strokeDasharray="10,10"
                    opacity="0.4"
                  />
                );
              })}
            </svg>

            {/* Spaceship */}
            <div
              className="absolute transition-all duration-[2000ms] ease-out z-30"
              style={{
                left: `${shipPosition.x}%`,
                top: `${shipPosition.y}%`,
                // PARA AJUSTAR LA ALTURA DE LA NAVE:
                // Cambia el segundo valor (-85%).
                // -50% es el centro exacto.
                // -100% es mucho más arriba.
                // -20% es más abajo.
                transform: 'translate(-50%, -140%)',
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 blur-xl">
                  <Rocket className="w-12 h-12 text-cyan-400 opacity-60" />
                </div>
                <Rocket className="relative w-12 h-12 text-cyan-400 animate-pulse transform -rotate-45" style={{
                  filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.8))'
                }} />
              </div>
            </div>

            {/* Planets */}
            {planets.map((planet) => {
              const unlocked = unlockedMissions.includes(planet.id);
              const visible = visiblePlanets.includes(planet.id);
              const isCurrent = Math.max(...unlockedMissions) === planet.id;

              return (
                <div
                  key={planet.id}
                  className="absolute transition-all duration-1000"
                  style={{
                    left: `${planet.x}%`,
                    top: `${planet.y}%`,
                    transform: `translate(-50%, -50%) scale(${visible ? 1 : 0})`,
                    opacity: visible ? 1 : 0,
                    zIndex: 10
                  }}
                >
                  <button
                    onClick={() => unlocked && startMission(planet.id)}
                    disabled={!unlocked}
                    className={`group relative flex flex-col items-center justify-center ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    style={{
                      animation: `float ${6 + planet.id}s ease-in-out infinite ${planet.id * 0.5}s`
                    }}
                  >
                    {/* Planet Glow / Aura */}
                    {unlocked && (
                      <div
                        className="absolute rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-700"
                        style={{
                          background: planet.color,
                          width: planet.size * 2,
                          height: planet.size * 2,
                          zIndex: -1
                        }}
                      />
                    )}

                    {/* Planet Visual */}
                    <div
                      className={`relative rounded-full shadow-2xl transition-all duration-700 ${unlocked ? 'group-hover:scale-105' : 'grayscale opacity-50'}`}
                      style={{
                        width: planet.size,
                        height: planet.size,
                        background: planet.gradient, // Use specific gradient for 3D effect
                        boxShadow: unlocked
                          ? `inset -20px -20px 50px rgba(0,0,0,0.6), 0 0 30px ${planet.glow}`
                          : 'inset -10px -10px 30px rgba(0,0,0,0.8)',
                        border: unlocked ? `1px solid ${planet.color}40` : '1px solid #333'
                      }}
                    >
                      {/* Active Indicator Ring */}
                      {isCurrent && (
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                      )}

                      {!unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                          <Lock className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Planet Label */}
                    <div className={`mt-6 text-center w-48 transition-opacity duration-300 ${unlocked ? 'opacity-100' : 'opacity-50'}`}>
                      <h3 className="text-xl font-bold text-white tracking-wide mb-1" style={{ textShadow: `0 0 10px ${planet.color}` }}>
                        {planet.name}
                      </h3>
                      <div className="text-xs font-light text-cyan-200 uppercase tracking-widest bg-blue-900/30 px-2 py-1 rounded inline-block">
                        {planet.title}
                      </div>
                      {!unlocked && (
                        <p className="text-xs text-red-400 mt-2 font-mono">LOCKED</p>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    );
  };

  const startMission = (missionId) => {
    setCurrentMissionId(missionId);

    // Use the pre-randomized mission data for varied correct answer positions
    if (randomizedMissionData && randomizedMissionData[missionId]) {
      // Do an additional shuffle to ensure even more variety
      const shuffleQuestions = randomizedMissionData[missionId].questions.map(q => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5)
      }));
      setCurrentQuestions(shuffleQuestions);
    } else {
      setCurrentQuestions([]);
    }

    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScene('game');
  };

  // Game/Quiz Scene
  const GameScene = () => {
    const mission = missionData[currentMissionId];
    if (!mission || !currentQuestions.length) return <div>Loading...</div>;

    const question = currentQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;

    const handleAnswer = (answer) => {
      if (showResult) return;

      setSelectedAnswer(answer);
      setShowResult(true);

      const isCorrect = answer === question.correct;

      if (isCorrect) {
        setScore(prev => prev + 1);
        setXp(prev => prev + 25);
        setStreak(prev => prev + 1);
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 1000);

        setTimeout(() => {
          if (isLastQuestion) {
            handleMissionComplete(score + 1, currentQuestions.length);
          } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
          }
        }, 1500);
      } else {
        setStreak(0);
        setTimeout(() => {
          if (isLastQuestion) {
            handleMissionComplete(score, currentQuestions.length);
          } else {
            setSelectedAnswer(null);
            setShowResult(false);
          }
        }, 2000);
      }
    };

    const handleMissionComplete = (finalScore, totalQuestions) => {
      const earnedXP = finalScore * 25;

      // Calculate new level or unlocks
      // Unlock NEXT mission logic
      const nextMissionId = currentMissionId + 1;
      let newPlanetUnlocked = null;

      // If we haven't unlocked this mission yet and it exists
      if (!unlockedMissions.includes(nextMissionId) && missionData[nextMissionId]) {
        setUnlockedMissions(prev => [...prev, nextMissionId]);
        setUnlockedPlanetId(nextMissionId);
        newPlanetUnlocked = nextMissionId;
        // Also level up for effect
        setLevel(prev => prev + 1);
      }

      setMissionResults({
        correct: finalScore,
        total: totalQuestions,
        xpEarned: earnedXP,
        unlockedPlanet: newPlanetUnlocked
      });

      if (currentMissionId === 6) {
        setScene('victory');
      } else {
        setScene('results');
      }
    };

    return (
      <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-black to-black"></div>

        {showParticles && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {/* Particles logic can stay or be simplified */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-ping absolute h-32 w-32 rounded-full bg-yellow-400 opacity-20"></div>
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div className="relative z-10 w-full max-w-4xl flex justify-between items-center mb-8">
          <button
            onClick={() => setScene('map')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white border border-white/10 rounded-full hover:border-white/30 transition-all duration-300"
          >
            <ArrowRight className="rotate-180 w-4 h-4" /> Abort Mission
          </button>

          <div className="text-xl font-light tracking-widest text-gray-400 uppercase">
            {mission.title}
          </div>
        </div>

        <div className="relative z-10 w-full max-w-4xl flex-1 flex flex-col justify-center">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-gray-500">Mission Progress</span>
              <span className="text-gray-400">{currentQuestionIndex + 1} / {currentQuestions.length}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Context / Scenario */}
          <div className="text-center mb-12">
            <div className="text-7xl mb-6">{question.icon}</div>

            {question.character && (
              <h2 className="text-4xl font-light text-white mb-2">{question.character}</h2>
            )}
            {question.scenario && (
              <h3 className="text-2xl text-gray-300 mb-2 italic">"{question.scenario}"</h3>
            )}

            <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 inline-block mt-4">
              <p className="text-blue-300 text-lg">
                {question.role || question.context || question.fact}
              </p>
            </div>
          </div>

          {/* Question Text */}
          <div key={currentQuestionIndex} className="animate-fade-in">
            <p className="text-center text-3xl font-light mb-12 text-white">
              {question.question}
            </p>
          </div>
          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fadeIn 0.5s ease-out forwards;
            }
          `}</style>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.correct;

              // Styles
              let baseStyle = "relative p-6 rounded-xl text-xl font-light transition-all duration-300 border cursor-pointer group hover:scale-105";
              if (showResult) {
                if (isCorrect) baseStyle = "relative p-6 rounded-xl text-xl font-medium border bg-green-500/20 border-green-500 text-green-200 scale-105";
                else if (isSelected) baseStyle = "relative p-6 rounded-xl text-xl font-light border bg-red-500/20 border-red-500 text-red-200 opacity-80";
                else baseStyle = "relative p-6 rounded-xl text-xl font-light border border-white/5 text-gray-600 opacity-50";
              } else {
                baseStyle += " bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={baseStyle}
                >
                  {option}
                  {showResult && isCorrect && <Check className="absolute top-4 right-4 w-5 h-5 text-green-400" />}
                  {showResult && isSelected && !isCorrect && <X className="absolute top-4 right-4 w-5 h-5 text-red-400" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Results Scene
  const ResultsScene = () => {
    const percentage = (missionResults.correct / missionResults.total) * 100;
    const isPerfect = percentage === 100;
    const unlockedPlanet = missionResults.unlockedPlanet ? planets.find(p => p.id === missionResults.unlockedPlanet) : null;

    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 p-8">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            {isPerfect ? <Trophy className="w-24 h-24 text-yellow-400 mx-auto animate-bounce" /> : <Award className="w-24 h-24 text-blue-400 mx-auto" />}
          </div>

          <h2 className="text-5xl font-light mb-4 text-white">Mission Complete!</h2>
          <p className="text-gray-400 text-xl mb-12">Assessment analysis complete.</p>

          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-white mb-2">{missionResults.correct}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Correct</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-white mb-2">{Math.round(percentage)}%</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">Accuracy</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-white mb-2">+{missionResults.xpEarned}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">XP Earned</div>
            </div>
          </div>

          {/* Planet Unlocked Notification */}
          {unlockedPlanet && (
            <div className="mb-8 p-6 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-yellow-400/30 rounded-2xl animate-pulse">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Star className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-yellow-400">NEW PLANET UNLOCKED!</h3>
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-xl text-white mb-2" style={{ textShadow: `0 0 10px ${unlockedPlanet.color}` }}>
                {unlockedPlanet.name}
              </p>
              <p className="text-sm text-cyan-300 uppercase tracking-wider">
                {unlockedPlanet.title}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setScene('map')}
            className="px-12 py-4 text-lg font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20"
          >
            Return to Galaxy Map
          </button>
        </div>
      </div>
    );
  };

  // Victory Scene - Final Reward
  const VictoryScene = () => {
    return (
      <div className="fixed inset-0 bg-black overflow-hidden z-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/30 via-black to-black"></div>

        {/* Stars Background */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Closing Crawl */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="perspective-container">
            <div className="crawl-text-ending">
              <div className="text-yellow-300 text-center space-y-12">
                <p className="text-7xl font-bold tracking-[0.5em] mb-20 text-blue-400">MISSION ACCOMPLISHED</p>

                <div className="text-3xl font-light leading-[3rem] max-w-4xl mx-auto space-y-16">
                  <p>The Galaxy is safe once again.</p>

                  <div className="space-y-6">
                    <p className="text-4xl text-yellow-500 font-bold">KNOWLEDGE ACQUIRED</p>
                    <ul className="space-y-4 text-gray-300">
                      <li>Character Personality Traits</li>
                      <li>Emotional Intelligence</li>
                      <li>Past Continuous Tense</li>
                      <li>Past Simple History</li>
                      <li>Future Forms (Will / Going to)</li>
                      <li>Conditionals (If / Unless)</li>
                    </ul>
                  </div>

                  <p>You have demonstrated the wisdom of a Jedi Master. The Force of English is strong with you.</p>

                  <div className="pt-20">
                    <p className="text-4xl font-bold text-white mb-4">CONGRATULATIONS</p>
                    <Star className="w-16 h-16 text-yellow-400 mx-auto animate-spin-slow" />
                  </div>

                  <div className="pt-10">
                    <p className="text-gray-400 text-2xl">Game Developed by</p>
                    <p className="text-yellow-400 text-4xl font-bold">Hiram González</p>
                    <p className="text-gray-500 text-xl pt-4">Thank you for playing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setScene('intro');
            setLevel(1);
            setXp(0);
            setUnlockedMissions([1]);
          }}
          className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50 px-12 py-4 text-xl font-bold text-black bg-yellow-400 rounded-full hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(250,204,21,0.5)]"
        >
          PLAY AGAIN
        </button>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .perspective-container {
            perspective: 400px;
            width: 100%;
            height: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .crawl-text-ending {
            transform-origin: 50% 100%;
            transform: rotateX(25deg);
            animation: crawlEnding 30s linear forwards; 
            padding-bottom: 50vh; /* Space to scroll completely off */
          }
          @keyframes crawlEnding {
            0% { transform: rotateX(25deg) translateY(100vh); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: rotateX(25deg) translateY(-150vh); opacity: 1; }
          }
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
          @keyframes spin {
             from { transform: rotate(0deg); }
             to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  };

  // --- PLANETS CONFIGURATION ---
  // Using radial gradients to simulate spheres
  const planets = [
    {
      id: 1,
      name: 'Tatooine',
      title: 'Character Traits',
      x: 15,
      y: 30,
      size: 100,
      color: '#E2B16D', // Sandy Orange
      gradient: 'radial-gradient(circle at 30% 30%, #E2B16D, #A67C43 60%, #5E4018)',
      glow: 'rgba(226, 177, 109, 0.6)',
    },
    {
      id: 2,
      name: 'Naboo',
      title: 'Emotions',
      x: 35,
      y: 15,
      size: 110,
      color: '#6EE7B7', // Green
      gradient: 'radial-gradient(circle at 30% 30%, #6EE7B7, #10B981 60%, #064E3B)',
      glow: 'rgba(110, 231, 183, 0.6)',
    },
    {
      id: 3,
      name: 'Coruscant',
      title: 'Past Continuous',
      x: 65,
      y: 25,
      size: 130,
      color: '#60A5FA', // Blue
      gradient: 'radial-gradient(circle at 30% 30%, #93C5FD, #3B82F6 60%, #1E3A8A)',
      glow: 'rgba(96, 165, 250, 0.6)',
    },
    {
      id: 4,
      name: 'Endor',
      title: 'History Keeper',
      x: 80,
      y: 55,
      size: 100,
      color: '#A3E635', // Forest Green
      gradient: 'radial-gradient(circle at 30% 30%, #D9F99D, #65A30D 60%, #365314)',
      glow: 'rgba(163, 230, 53, 0.6)',
    },
    {
      id: 5,
      name: 'Bespin',
      title: 'Future Plans',
      x: 60,
      y: 80,
      size: 110,
      color: '#F472B6', // Pink
      gradient: 'radial-gradient(circle at 30% 30%, #FBCFE8, #EC4899 60%, #BE185D)',
      glow: 'rgba(244, 114, 182, 0.6)',
    },
    {
      id: 6,
      name: 'Death Star',
      title: 'Final Battle',
      x: 25,
      y: 75,
      size: 160,
      color: '#EF4444', // Red
      gradient: 'radial-gradient(circle at 40% 40%, #999, #333 40%, #111 100%)',
      glow: 'rgba(239, 68, 68, 0.8)',
    }
  ];

  return (
    <>
      {scene === 'crawl' && <CrawlScene />}
      {scene === 'intro' && <IntroScene />}
      {scene === 'map' && <MissionMap />}
      {scene === 'game' && <GameScene />}
      {scene === 'results' && <ResultsScene />}
      {scene === 'victory' && <VictoryScene />}
    </>
  );
};

export default App;
