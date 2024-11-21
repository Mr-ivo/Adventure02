'use client';
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  Settings,
  Eye,
  ThumbsUp,
  Clock,
  Plus,
  Search,
  Edit,
  Trash2,
  Menu,
  X,
  Upload,
  AlertCircle
} from "lucide-react";
import Image from "next/image";

const Dashboard = () => {
  // State Management
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [posts, setPosts] = useState([
    // Initial dummy data
    {
      id: 1,
      title: "Sample Post",
      content: "This is a sample post content",
      excerpt: "Sample excerpt",
      image: "/placeholder.jpg",
      views: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    }
  ]);
  const [users, setUsers] = useState([
    // Initial dummy data
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      avatar: "/default-avatar.jpg"
    }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filter posts safely
  const filteredPosts = posts.filter(post => {
    if (!post) return false;
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = post.title?.toLowerCase()?.includes(searchLower) || false;
    const contentMatch = post.content?.toLowerCase()?.includes(searchLower) || false;
    return titleMatch || contentMatch;
  });

  // Filter users safely
  const filteredUsers = users.filter(user => {
    if (!user) return false;
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = user.name?.toLowerCase()?.includes(searchLower) || false;
    const emailMatch = user.email?.toLowerCase()?.includes(searchLower) || false;
    return nameMatch || emailMatch;
  });

  // Stats calculation with safe access
  const stats = [
    { 
      title: "Total Posts", 
      value: posts?.length || 0, 
      icon: <FileText /> 
    },
    { 
      title: "Total Views", 
      value: posts?.reduce((acc, post) => acc + (post?.views || 0), 0) || 0,
      icon: <Eye /> 
    },
    { 
      title: "Total Users", 
      value: users?.length || 0, 
      icon: <Users /> 
    },
    { 
      title: "Comments", 
      value: posts?.reduce((acc, post) => acc + (post?.comments || 0), 0) || 0,
      icon: <MessageSquare /> 
    },
  ];

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch posts
        const postsResponse = await fetch('/api/posts');
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setPosts(postsData);
        }

        // Fetch users
        const usersResponse = await fetch('/api/users');
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Keep the initial dummy data if fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <h2>Blog Admin</h2>
          <button 
            className={styles.menuToggle}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className={styles.navigation}>
          <button 
            className={`${styles.navItem} ${activeTab === "overview" ? styles.active : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === "posts" ? styles.active : ""}`}
            onClick={() => setActiveTab("posts")}
          >
            <FileText size={20} />
            <span>Posts</span>
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === "users" ? styles.active : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={20} />
            <span>Users</span>
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.searchBar}>
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Display loading state */}
        {isLoading && (
          <div className={styles.loading}>
            <p>Loading...</p>
          </div>
        )}

        {/* Display content based on active tab */}
        {!isLoading && (
          <>
            {/* Stats Grid */}
            {activeTab === "overview" && (
              <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                  <div key={index} className={styles.statCard}>
                    <div className={styles.statIcon}>{stat.icon}</div>
                    <div className={styles.statInfo}>
                      <h3>{stat.title}</h3>
                      <p>{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Posts Grid */}
            {activeTab === "posts" && (
              <div className={styles.postsGrid}>
                {filteredPosts.map(post => (
                  <div key={post.id} className={styles.postCard}>
                    <div className={styles.postImage}>
                      <Image
                        src={post.image || "/placeholder.jpg"}
                        alt={post.title}
                        width={300}
                        height={200}
                        layout="responsive"
                      />
                    </div>
                    <div className={styles.postContent}>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className={styles.postMeta}>
                        <span><Clock size={14} /> {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span><Eye size={14} /> {post.views}</span>
                        <span><MessageSquare size={14} /> {post.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Users Grid */}
            {activeTab === "users" && (
              <div className={styles.usersGrid}>
                {filteredUsers.map(user => (
                  <div key={user.id} className={styles.userCard}>
                    <div className={styles.userAvatar}>
                      <Image
                        src={user.avatar || "/default-avatar.jpg"}
                        alt={user.name}
                        width={60}
                        height={60}
                        className={styles.avatar}
                      />
                    </div>
                    <div className={styles.userInfo}>
                      <h3>{user.name}</h3>
                      <p>{user.email}</p>
                      <span className={styles.role}>{user.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;