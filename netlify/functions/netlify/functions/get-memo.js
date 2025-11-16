<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quantum Gain | The First Quantum-Enhanced Token</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        :root {
            --primary: #00f3ff;
            --secondary: #7700ff;
            --accent: #ff00c8;
            --dark: #0a0a1a;
            --darker: #050510;
            --light: #e0f8ff;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            background-color: var(--darker);
            color: var(--light);
            overflow-x: hidden;
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(119, 0, 255, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(0, 243, 255, 0.1) 0%, transparent 20%),
                radial-gradient(circle at 50% 50%, rgba(255, 0, 200, 0.05) 0%, transparent 50%);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header Styles */
        header {
            padding: 20px 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            background: rgba(5, 5, 16, 0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(0, 243, 255, 0.2);
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            text-shadow: 0 0 10px var(--primary);
        }

        .logo i {
            color: var(--accent);
        }

        nav ul {
            display: flex;
            list-style: none;
            gap: 30px;
        }

        nav a {
            color: var(--light);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
        }

        nav a:hover {
            color: var(--primary);
        }

        nav a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary);
            transition: width 0.3s ease;
        }

        nav a:hover::after {
            width: 100%;
        }

        .cta-button {
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            color: var(--darker);
            border: none;
            padding: 10px 25px;
            border-radius: 30px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 0 15px rgba(0, 243, 255, 0.5);
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 0 20px rgba(0, 243, 255, 0.8);
        }

        /* Hero Section */
        .hero {
            padding: 180px 0 100px;
            text-align: center;
            position: relative;
        }

        .hero-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.3;
            background: radial-gradient(circle at center, var(--secondary) 0%, transparent 70%);
        }

        .hero h1 {
            font-size: 4rem;
            margin-bottom: 20px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
        }

        .hero p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto 30px;
            line-height: 1.6;
            color: rgba(224, 248, 255, 0.8);
        }

        .hero-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
        }

        .secondary-button {
            background: transparent;
            color: var(--primary);
            border: 2px solid var(--primary);
            padding: 10px 25px;
            border-radius: 30px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .secondary-button:hover {
            background: rgba(0, 243, 255, 0.1);
            box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
        }

        /* Quantum Circuit Animation */
        .quantum-circuit {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            overflow: hidden;
        }

        .circuit-line {
            position: absolute;
            background: rgba(0, 243, 255, 0.1);
            height: 1px;
            width: 100%;
            animation: circuitPulse 8s infinite;
        }

        .circuit-node {
            position: absolute;
            width: 8px;
            height: 8px;
            background: var(--primary);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--primary);
            animation: nodePulse 4s infinite;
        }

        @keyframes circuitPulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.4; }
        }

        @keyframes nodePulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.5); opacity: 1; }
        }

        /* Features Section */
        .features {
            padding: 100px 0;
            background: rgba(10, 10, 26, 0.7);
        }

        .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 60px;
            color: var(--primary);
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }

        .feature-card {
            background: rgba(5, 5, 16, 0.7);
            border: 1px solid rgba(0, 243, 255, 0.2);
            border-radius: 15px;
            padding: 30px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0, 243, 255, 0.05), rgba(119, 0, 255, 0.05));
            z-index: -1;
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0, 243, 255, 0.2);
            border-color: var(--primary);
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: var(--accent);
        }

        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: var(--primary);
        }

        .feature-card p {
            color: rgba(224, 248, 255, 0.8);
            line-height: 1.6;
        }

        /* Tokenomics Section */
        .tokenomics {
            padding: 100px 0;
        }

        .tokenomics-content {
            display: flex;
            align-items: center;
            gap: 50px;
        }

        .tokenomics-text {
            flex: 1;
        }

        .tokenomics-chart {
            flex: 1;
            position: relative;
            height: 400px;
        }

        .chart-container {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .chart-item {
            position: absolute;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            background: rgba(5, 5, 16, 0.8);
            border: 2px solid;
            box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
            transition: all 0.3s ease;
        }

        .chart-item:hover {
            transform: scale(1.1);
            z-index: 10;
        }

        .chart-item-1 {
            top: 40%;
            left: 10%;
            border-color: var(--primary);
        }

        .chart-item-2 {
            top: 20%;
            right: 20%;
            border-color: var(--secondary);
        }

        .chart-item-3 {
            bottom: 30%;
            left: 20%;
            border-color: var(--accent);
        }

        .chart-item-4 {
            bottom: 20%;
            right: 10%;
            border-color: #00ff88;
        }

        .chart-percentage {
            font-size: 1.8rem;
            font-weight: 700;
        }

        .chart-label {
            font-size: 0.9rem;
            margin-top: 5px;
        }

        /* How It Works Section */
        .how-it-works {
            padding: 100px 0;
            background: rgba(10, 10, 26, 0.7);
        }

        .steps {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            position: relative;
        }

        .steps::before {
            content: '';
            position: absolute;
            top: 40px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
            z-index: 1;
        }

        .step {
            text-align: center;
            position: relative;
            z-index: 2;
            flex: 1;
            padding: 0 20px;
        }

        .step-number {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: var(--darker);
            border: 2px solid var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary);
            box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
        }

        .step h3 {
            margin-bottom: 15px;
            color: var(--primary);
        }

        .step p {
            color: rgba(224, 248, 255, 0.8);
            line-height: 1.6;
        }

        /* CTA Section */
        .cta-section {
            padding: 100px 0;
            text-align: center;
            background: radial-gradient(circle at center, rgba(119, 0, 255, 0.2) 0%, transparent 70%);
        }

        .cta-section h2 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: var(--primary);
        }

        .cta-section p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto 40px;
            color: rgba(224, 248, 255, 0.8);
        }

        /* Whitepaper Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(5, 5, 16, 0.9);
            z-index: 2000;
            overflow-y: auto;
        }

        .modal-content {
            background: var(--darker);
            margin: 50px auto;
            padding: 30px;
            border-radius: 15px;
            width: 90%;
            max-width: 800px;
            border: 1px solid var(--primary);
            box-shadow: 0 0 30px rgba(0, 243, 255, 0.3);
            position: relative;
        }

        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 1.5rem;
            color: var(--primary);
            background: none;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .close-modal:hover {
            color: var(--accent);
            transform: scale(1.1);
        }

        .whitepaper-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(0, 243, 255, 0.3);
        }

        .whitepaper-header h2 {
            font-size: 2.2rem;
            color: var(--primary);
            margin-bottom: 10px;
        }

        .whitepaper-header p {
            color: rgba(224, 248, 255, 0.7);
        }

        .whitepaper-section {
            margin-bottom: 30px;
        }

        .whitepaper-section h3 {
            color: var(--primary);
            margin-bottom: 15px;
            font-size: 1.4rem;
        }

        .whitepaper-section p {
            line-height: 1.6;
            margin-bottom: 15px;
            color: rgba(224, 248, 255, 0.8);
        }

        .whitepaper-download {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid rgba(0, 243, 255, 0.3);
        }

        /* Footer */
        footer {
            padding: 50px 0 20px;
            background: rgba(5, 5, 16, 0.9);
            border-top: 1px solid rgba(0, 243, 255, 0.2);
        }

        .footer-content {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
        }

        .footer-logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 20px;
        }

        .footer-links {
            display: flex;
            gap: 40px;
        }

        .footer-column h3 {
            color: var(--primary);
            margin-bottom: 20px;
            font-size: 1.2rem;
        }

        .footer-column ul {
            list-style: none;
        }

        .footer-column li {
            margin-bottom: 10px;
        }

        .footer-column a {
            color: rgba(224, 248, 255, 0.7);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-column a:hover {
            color: var(--primary);
        }

        .social-links {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }

        .social-links a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(0, 243, 255, 0.1);
            color: var(--primary);
            transition: all 0.3s ease;
        }

        .social-links a:hover {
            background: var(--primary);
            color: var(--darker);
            transform: translateY(-3px);
        }

        .copyright {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid rgba(0, 243, 255, 0.1);
            color: rgba(224, 248, 255, 0.5);
            font-size: 0.9rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                gap: 20px;
            }

            nav ul {
                gap: 15px;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .hero-buttons {
                flex-direction: column;
                align-items: center;
            }

            .tokenomics-content {
                flex-direction: column;
            }

            .steps {
                flex-direction: column;
                gap: 40px;
            }

            .steps::before {
                display: none;
            }

            .footer-content {
                flex-direction: column;
                gap: 40px;
            }

            .footer-links {
                flex-direction: column;
                gap: 30px;
            }

            .modal-content {
                width: 95%;
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <i class="fas fa-atom"></i>
                    <span>QUANTUM GAIN</span>
                </div>
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#tokenomics">Tokenomics</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                    </ul>
                </nav>
                <button class="cta-button" id="connect-wallet">Connect Wallet</button>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="quantum-circuit" id="circuit"></div>
        <div class="hero-bg"></div>
        <div class="container">
            <h1>Quantum Gain</h1>
            <p>The first quantum-enhanced token on Pump.fun that uses entanglement principles to ensure all participants benefit from price movements. Our revolutionary algorithm creates a symbiotic ecosystem where gains are distributed across the network.</p>
            <div class="hero-buttons">
                <button class="cta-button" id="buy-tokens">Buy on Pump.fun</button>
                <button class="secondary-button" id="whitepaper-btn">Read Whitepaper</button>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
        <div class="container">
            <h2 class="section-title">Revolutionary Features</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-project-diagram"></i>
                    </div>
                    <h3>Quantum Entanglement</h3>
                    <p>Our tokens are mathematically entangled, creating a network where price movements benefit all holders through our proprietary distribution algorithm.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3>Gain Redistribution</h3>
                    <p>A percentage of every transaction is redistributed to all holders, with bonus multipliers for long-term participants and early supporters.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Anti-Dump Mechanism</h3>
                    <p>Advanced algorithms detect and penalize large sell orders, protecting the community from coordinated dumping and ensuring price stability.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <h3>Liquidity Acceleration</h3>
                    <p>Automated liquidity pooling ensures continuous market growth, with funds locked for 2 years to guarantee long-term project sustainability.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Tokenomics Secti
