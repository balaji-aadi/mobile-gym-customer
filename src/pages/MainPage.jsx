import { motion, useScroll, useTransform } from 'framer-motion';
import { ParallaxProvider } from 'react-scroll-parallax';
import logo from "../../public/Logos/main-logo-dark-01.png"
import fitness from "../../public/Logos/fitness-logo.png"
import wellness from "../../public/Logos/wellness-main-logo.png"
import liveness from "../../public/Logos/liveness-logo-red.png"
import Header from '../components/Header';
import { useEffect, useRef, useState } from 'react';
import { CategoryApi } from '../Api/Category.api';
import { useLoading } from '../loader/LoaderContext';
import { Link } from 'react-router-dom';
import Description from '../components/Description';
import { ReviewgApi } from '../Api/Review.api';

const MainPage = () => {
    const [category, setCategory] = useState([]);
    const [ratings, setRatings] = useState([]);

    const [currentReviews, setCurrentReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (ratings.length > 0) {
            const endIndex = Math.min(currentIndex + 2, ratings.length);
            setCurrentReviews(ratings.slice(currentIndex, endIndex));
            if (endIndex >= ratings.length) {
                setTimeout(() => setCurrentIndex(0), 5000);
            } else {
                setTimeout(() => setCurrentIndex(currentIndex + 2), 5000);
            }
        }
    }, [currentIndex, ratings])


    const { handleLoading } = useLoading()

    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax transformations
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

    // New transformations for hero section
    const heroScroll = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(heroScroll.scrollYProgress, [0, 1], [0, -200]);
    const heroOpacity = useTransform(heroScroll.scrollYProgress, [0, 0.5], [1, 0]);

    const getAllCategory = async () => {
        handleLoading(true);
        try {
            const res = await CategoryApi.Allcategory();
            setCategory(res?.data?.data);
        } catch (error) {
            console.log("Error", error);
        } finally {
            handleLoading(false);
        }
    };
    const getAllRatingReviews = async () => {
        handleLoading(true);
        try {
            const res = await ReviewgApi.getAllRatingReviews();
            setRatings(res?.data?.data?.reviews);
        } catch (error) {
            console.log("Error", error);
        } finally {
            handleLoading(false);
        }
    };

    useEffect(() => {
        getAllCategory()
        getAllRatingReviews()
    }, [])


    return (
        <ParallaxProvider>
            <div className="font-sans text-primary bg-white overflow-x-hidden" ref={containerRef}>
                {/* Hero section */}
                <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
                    <motion.div
                        style={{ opacity: heroOpacity }}
                        className=" inset-0 z-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2120&q=80')] bg-cover bg-center"></div>
                    </motion.div>
                    <motion.div
                        style={{ y: heroY }}
                        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-4xl mx-auto"
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-fourth mb-4 sm:mb-6 leading-tight">
                                Live <span className="text-third">Outside</span> The Box
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-fourth max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                                Boldly, creatively, and without limits. Join our movement for fitness, wellness, and vibrant community.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-third hover:bg-third-dark text-fifth font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
                            >
                                <Link to={"/subscriptions"}>Join the Movement</Link>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
                    >
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                            }}
                            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
                        >
                            <motion.div
                                className="w-1 h-2 bg-primary rounded-full mt-1"
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </section>

                {/* About section */}
                <section id="about" className="py-16 sm:py-20 bg-gray-50 relative">
                    <motion.div
                        style={{ opacity: heroOpacity }}
                        className="fixed inset-0 z-0 pointer-events-none"
                    />

                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="container mx-auto px-4 sm:px-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="max-w-7xl mx-auto"
                            >
                                <Header content={"About OutBox"} />
                                <div className="grid md:grid-cols-1 gap-8 sm:gap-12 items-center">
                                    <motion.div
                                        initial={{ x: 50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="space-y-4 sm:space-y-6"
                                    >
                                        <p className="text-gray-700">
                                            <span className="font-bold text-primary">Outbox is a lifestyle brand</span> founded on the belief that life is meant to be lived <span className="text-third font-medium">outside the box</span> — boldly, creatively, and without limits.
                                        </p>

                                        <p className="text-gray-700">
                                            We design and deliver <span className="font-medium">unique experiences</span> across fitness, wellness, and community gatherings, empowering individuals to break free from routine, challenge the status quo, and express their authentic selves.
                                        </p>

                                        <div className="p-4 sm:p-6 bg-white bg-opacity-70 rounded-lg border-l-4 border-third shadow-sm">
                                            <p className="text-gray-700 italic">
                                                "Whether through dynamic classes, mindful wellness sessions, or vibrant social events, Outbox inspires you to move, grow, and connect in ways that spark transformation and joy."
                                            </p>
                                        </div>

                                        <p className="text-gray-700">
                                            More than a brand, Outbox is a <span className="font-medium">mindset</span> — a movement for those who dare to live <span className="text-third font-medium">fully and fearlessly</span>.
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Rest of your about section content... */}
                    </div>
                </section>

                {/* Brand Story section */}
                <section className="my-20 max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="rounded-xl overflow-hidden shadow-2xl">
                                <div className="h-96 bg-[url('https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <Header content={"Brand Story"} />
                            <p className="text-gray-700">
                                Outbox was born from one bold thought: <span className="font-semibold">What if we could live outside the box?</span>
                            </p>
                            <p className="text-gray-700">
                                Our founder set out to build a brand that breaks routine — one that celebrates movement, creativity, and self-expression.
                            </p>
                            <blockquote className="border-l-4 border-third pl-4 italic text-gray-700">
                                "Your only limit is the one you set yourself."
                            </blockquote>
                            <p className="text-gray-700">
                                That mindset is at the heart of everything we do. Outbox isn't just classes or products — it's a community of doers and dreamers who believe life is meant to be lived fully, freely, and fearlessly.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/*  Logo Story Section */}
                <section className="py-24 sm:py-32 bg-primary text-white relative overflow-hidden">
                    <motion.div
                        style={{ scale, y: y2 }}
                        className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90 z-0"
                    />

                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="max-w-5xl mx-auto text-center"
                        >
                            <Header content={"Our Logo Story"} text={"text-white"} background={"bg-white"} />

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl sm:text-2xl mb-2 sm:mb-5 leading-relaxed max-w-3xl mx-auto"
                            >
                                OutBox was born to break the mold — redefining how people experience movement, health, and connection.
                            </motion.p>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl sm:text-sm mb-8  leading-relaxed max-w-3xl mx-auto"
                            >
                                Our name means operating outside the box, both literally and figuratively. We bring fitness, wellness, and community experiences to you — transforming everyday spaces into places for energy, balance, and connection.
                            </motion.p>

                            {/* Enhanced Logo Display with 3D Effect */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="flex justify-center mb-12 sm:mb-16"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotateY: 10 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-white rounded-full flex items-center justify-center p-4 shadow-2xl"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        boxShadow: '0 30px 50px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    <img src={logo} alt="OutBox Logo" className="w-full h-full object-contain" />
                                </motion.div>
                            </motion.div>

                            <Header content={"Our logo captures this spirit"} text={"text-white"} background={"bg-white"} />


                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                                {[
                                    {
                                        title: "Wheels in Motion",
                                        desc: "Our logo represents constant movement and progress, driving you forward.",
                                    },
                                    {
                                        title: "Structure Meets Creativity",
                                        desc: "A balance between discipline and imagination in every experience.",
                                    },
                                    {
                                        title: "Space to Breathe",
                                        desc: "Freedom to express, grow, and thrive in your own way.",
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ y: 50, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: index * 0.2 }}
                                        viewport={{ once: true }}
                                        className="bg-white bg-opacity-10 p-6 sm:p-8 rounded-xl backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
                                    >
                                        <h3 className="text-xl sm:text-2xl font-bold mb-3">{item.title}</h3>
                                        <p className="text-white text-opacity-90 leading-relaxed">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl sm:text-sm mb-8  leading-relaxed max-w-3xl mx-auto"
                            >
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="text-xl sm:text-sm mb-8  leading-relaxed max-w-3xl mx-auto"
                                >
                                    OutBox lives through three sub-brands: Fitness, Wellness, and Liveness — all designed to help you live fully, wherever you are.
                                </motion.p>
                            </motion.p>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                viewport={{ once: true }}
                                className="text-2xl sm:text-3xl font-bold tracking-wide mb-4"
                            >
                                OutBox — Built to Move.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Values Section*/}
                <section id="values" className="py-16 sm:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="max-w-4xl mx-auto text-center mb-12 sm:mb-16"
                        >
                            <Header content={"Our Values"} />
                            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                                At OutBox, our values are the foundation of everything we do. They guide how we move, create, and connect.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Courage",
                                    description: "We believe in stepping beyond comfort zones and embracing challenges with fearless determination.",
                                    color: "bg-primary text-second"
                                },
                                {
                                    title: "Creativity",
                                    description: "Innovation and imagination fuel our approach, encouraging new ways to move, think, and celebrate life.",
                                    color: "bg-second text-fifth"
                                },
                                {
                                    title: "Community",
                                    description: "OutBox is more than a brand — it's a vibrant community where connections are forged, and support is real.",
                                    color: "bg-third text-fifth"
                                },
                                {
                                    title: "Authenticity",
                                    description: "Being true to yourself is at the heart of OutBox. We celebrate individuality and genuine self-expression.",
                                    color: "bg-fourth text-second"
                                },
                                {
                                    title: "Empowerment",
                                    description: "We inspire and equip people to take control of their health, wellness, and happiness.",
                                    color: "bg-fifth text-primary"
                                }
                            ].map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`p-6 rounded-xl shadow-md ${value.color} flex flex-col`}
                                >
                                    <h3 className="text-xl sm:text-2xl font-bold mb-3">{value.title}</h3>
                                    <p className="flex-grow">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Community Section*/}
                <section id="community" className="py-24 sm:py-32 bg-gray-50 relative overflow-hidden">
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute -left-40 top-1/3 w-80 h-80 rounded-full bg-third opacity-10 blur-3xl"
                    />

                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="order-2 md:order-1"
                            >
                                <Header content={"The OutBox Community"} />
                                <p className="text-lg text-gray-700 mb-6">
                                    OutBox isn’t just a brand — it’s a movement powered by people.
                                </p>

                                <div className="space-y-6 mb-8">
                                    {[
                                        "Our community is made up of doers, dreamers, and disruptors from all walks of life, united by a shared belief: life is better when lived outside the box.",
                                        "Whether you’re pushing your limits in a class, finding calm in wellness sessions, or celebrating together at an event, you’re part of a tribe that values courage, creativity, and connection.",
                                        "Here, everyone belongs. Everyone grows. And everyone moves forward — together.",
                                        "Join us and discover how powerful it feels to break free and live fully"
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ x: -20, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.2 }}
                                            viewport={{ once: true }}
                                            className="flex items-start"
                                        >
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-5 h-5 rounded-full bg-third"></div>
                                            </div>
                                            <p className="ml-4 text-lg text-gray-700">{item}</p>
                                        </motion.div>
                                    ))}
                                </div>

                            </motion.div>

                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="order-1 md:order-2 relative h-96 rounded-2xl overflow-hidden shadow-2xl"
                            >

                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>

                                {/* Floating testimonial cards */}
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="absolute bottom-0 left-0 bg-white p-6 rounded-xl shadow-lg w-64 z-10"
                                >
                                    {currentReviews[0] && (
                                        <>
                                            <p className="text-gray-700 italic mb-3">
                                                {currentReviews[0].review.length > 100
                                                    ? `${currentReviews[0].review.substring(0, 100)}...`
                                                    : currentReviews[0].review}
                                            </p>
                                            <p className="font-bold text-primary">
                                                — {currentReviews[0].created_by.first_name}
                                                <span className="text-yellow-400 ml-1">
                                                    {'★'.repeat(currentReviews[0].rating)}
                                                    {'☆'.repeat(5 - currentReviews[0].rating)}
                                                </span>
                                            </p>
                                        </>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    viewport={{ once: true }}
                                    className="absolute top-0 right-0 bg-third p-6 rounded-xl shadow-lg w-64 z-10 text-white"
                                >
                                    {currentReviews[1] && (
                                        <>
                                            <p className="italic mb-3">
                                                {currentReviews[1].review.length > 100
                                                    ? `${currentReviews[1].review.substring(0, 100)}...`
                                                    : currentReviews[1].review}
                                            </p>
                                            <p className="font-bold">
                                                — {currentReviews[1].created_by.first_name}
                                                <span className="text-yellow-400 ml-1">
                                                    {'★'.repeat(currentReviews[1].rating)}
                                                    {'☆'.repeat(5 - currentReviews[1].rating)}
                                                </span>
                                            </p>
                                        </>
                                    )}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Sub-Brands Section */}
                <section className="py-16 sm:py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="max-w-4xl mx-auto text-center mb-12 sm:mb-16"
                        >
                            <Header content={"Our Sub-Brands"} />
                            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                                OutBox lives through three sub-brands all designed to help you live fully, wherever you are.
                            </p>
                        </motion.div>

                        {category?.length > 0 && (
                            <section className="py-12">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {category.map((cat) => (
                                            <motion.div
                                                key={cat._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                                                whileHover={{ y: -5 }}
                                                className="relative"
                                            >
                                                <Link
                                                    to={`/subscriptions/${cat._id}?name=cat`}
                                                    className="block group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                                                >
                                                    <div className="relative h-48 overflow-hidden">
                                                        <motion.img
                                                            src={cat.image}
                                                            alt={cat.alt}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            initial={{ scale: 1 }}
                                                            whileHover={{ scale: 1.1 }}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                                    </div>

                                                    <div className="bg-white p-6">
                                                        <h3 className="text-lg font-bold text-gray-900 mb-2 capitalize">
                                                            {cat.cName}
                                                        </h3>
                                                        <Description description={cat.description} length={200} />
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </section>
            </div>
        </ParallaxProvider>
    );
};

export default MainPage;