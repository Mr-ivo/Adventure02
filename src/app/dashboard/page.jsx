"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  Settings, 
  TrendingUp,
  Eye,
  ThumbsUp,
  Clock,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";
import { useLanguage } from "@/app/context/LanguageContext";
import Navbar from "../Navbar/Navbar";

// Analytics Card Component
const AnalyticsCard = ({ title, value, icon, trend }) => {
  const trendColor = trend >= 0 ? styles.positive : styles.negative;
  
  return (
    <motion.div 
      className={styles.analyticsCard}
      whileHover={{ scale: 1.02 }}
    >
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <p className={styles.value}>{value}</p>
        <span className={`${styles.trend} ${trendColor}`}>
          {trend}% from last month
        </span>
      </div>
    </motion.div>
  );
};

// Post List Item Component
const PostListItem = ({ post, onEdit, onDelete }) => {
  return (
    <motion.div 
      className={styles.postItem}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.postImage}>
        <Image
          src={post.image}
          alt={post.title}
          width={80}
          height={80}
          objectFit="cover"
        />
      </div>
      <div className={styles.postInfo}>
        <h4>{post.title}</h4>
        <p>{post.excerpt}</p>
        <div className={styles.postMeta}>
          <span><Clock size={14} /> {post.date}</span>
          <span><Eye size={14} /> {post.views} views</span>
          <span><MessageSquare size={14} /> {post.comments} comments</span>
        </div>
      </div>
      <div className={styles.postActions}>
        <button onClick={() => onEdit(post)} className={styles.editButton}>
          <Edit size={16} />
        </button>
        <button onClick={() => onDelete(post.id)} className={styles.deleteButton}>
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for demonstration
  const analyticsData = {
    totalPosts: { value: 156, trend: 12 },
    totalViews: { value: "23.5K", trend: 8 },
    engagement: { value: "68%", trend: -3 },
    comments: { value: 892, trend: 15 }
  };

  useEffect(() => {
    // Simulating API call to fetch posts
    const fetchPosts = async () => {
      try {
        // Replace with actual API call
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNewPost = () => {
    // Implement new post creation logic
  };

  const handleEditPost = (post) => {
    // Implement post editing logic
  };

  const handleDeletePost = (postId) => {
    // Implement post deletion logic
  };

  return (
    <>
    <Navbar />
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <nav className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Urban Blog</h2>
        </div>
        <ul className={styles.nav}>
          <li 
            className={activeTab === "overview" ? styles.active : ""}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard size={20} />
            <span>{t('dashboard.overview')}</span>
          </li>
          <li 
            className={activeTab === "posts" ? styles.active : ""}
            onClick={() => setActiveTab("posts")}
          >
            <FileText size={20} />
            <span>{t('dashboard.posts')}</span>
          </li>
          <li 
            className={activeTab === "users" ? styles.active : ""}
            onClick={() => setActiveTab("users")}
          >
            <Users size={20} />
            <span>{t('dashboard.users')}</span>
          </li>
          <li 
            className={activeTab === "comments" ? styles.active : ""}
            onClick={() => setActiveTab("comments")}
          >
            <MessageSquare size={20} />
            <span>{t('dashboard.comments')}</span>
          </li>
          <li 
            className={activeTab === "settings" ? styles.active : ""}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} />
            <span>{t('dashboard.settings')}</span>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className={styles.content}>
        {/* Header */}
        <header className={styles.header}>
          <h1>{t(`dashboard.${activeTab}`)}</h1>
          <button 
            className={styles.newPostButton}
            onClick={handleNewPost}
          >
            <Plus size={20} />
            {t('dashboard.newPost')}
          </button>
        </header>

        {/* Analytics Section */}
        <section className={styles.analytics}>
          <AnalyticsCard
            title={t('dashboard.totalPosts')}
            value={analyticsData.totalPosts.value}
            icon={<FileText size={24} />}
            trend={analyticsData.totalPosts.trend}
          />
          <AnalyticsCard
            title={t('dashboard.totalViews')}
            value={analyticsData.totalViews.value}
            icon={<Eye size={24} />}
            trend={analyticsData.totalViews.trend}
          />
          <AnalyticsCard
            title={t('dashboard.engagement')}
            value={analyticsData.engagement.value}
            icon={<ThumbsUp size={24} />}
            trend={analyticsData.engagement.trend}
          />
          <AnalyticsCard
            title={t('dashboard.comments')}
            value={analyticsData.comments.value}
            icon={<MessageSquare size={24} />}
            trend={analyticsData.comments.trend}
          />
        </section>

        {/* Posts Management Section */}
        <section className={styles.postsSection}>
          <div className={styles.postsHeader}>
            <div className={styles.searchBar}>
              <Search size={20} />
              <input
                type="text"
                placeholder={t('dashboard.searchPosts')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.filters}>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">{t('dashboard.allPosts')}</option>
                <option value="published">{t('dashboard.published')}</option>
                <option value="draft">{t('dashboard.drafts')}</option>
              </select>
            </div>
          </div>

          <div className={styles.postsList}>
            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner} />
                <p>{t('dashboard.loading')}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className={styles.noPosts}>
                <AlertCircle size={48} />
                <p>{t('dashboard.noPosts')}</p>
              </div>
            ) : (
              posts.map(post => (
                <PostListItem
                  key={post.id}
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
    </>
  );
};

export default Dashboard;