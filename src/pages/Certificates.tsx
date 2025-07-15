import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Award, ShieldCheck, Copy, Check, X, Eye } from 'lucide-react';
import { certificates, certificateCategories, type Certificate, getCertificateStats } from '../constants/Certificates';
import CodeBlock from '../components/ui/CodeBlock';
import TechIcon from '../components/ui/TechIcon';

const Certificates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const stats = getCertificateStats();

  const certificatesCode = `// Professional Certifications Portfolio
const certificationPortfolio = {
  developer: "MiyakoAi",
  lastUpdated: "${new Date().toISOString().split('T')[0]}",
  
  stats: {
    totalCertifications: ${stats.total},
    featuredCertifications: ${stats.featured},
    activeCertifications: ${stats.active},
    lifetimeCertifications: ${stats.lifetime}
  },
  
  categories: [
    "Backend Development",
    "Cloud Computing", 
    "Database Management",
    "DevOps & Containerization",
    "General Programming"
  ],
  
  getLatestCertification() {
    return this.certifications
      .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))[0];
  },
  
  getCertificationsByCategory(category) {
    return this.certifications.filter(cert => cert.category === category);
  },
  
  verifyCredential(credentialId) {
    const cert = this.certifications.find(c => c.credentialId === credentialId);
    return cert ? cert.verificationUrl : null;
  }
};

// Professional growth through continuous learning
console.log("Certifications showcase ready!");`;

  const sortedAndFilteredCertificates = useMemo(() => {
    const filtered = certificates.filter(cert => {
      const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
      const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          const dateA = new Date(a.issueDate).getTime();
          const dateB = new Date(b.issueDate).getTime();
          comparison = dateA - dateB;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [selectedCategory, searchTerm, sortBy, sortOrder]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-terminal-green';
      case 'expired': return 'text-terminal-red';
      case 'lifetime': return 'text-terminal-blue';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '✅';
      case 'expired': return '❌';
      case 'lifetime': return '♾️';
      default: return '❓';
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-2">
          $ find certificates/
        </h1>
        <p className="text-terminal-text opacity-80">
          Professional certifications and continuous learning achievements
        </p>
      </div>

      {/* Code Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <CodeBlock 
          code={certificatesCode}
          language="javascript"
          animated={true}
          speed={20}
        />
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total', value: stats.total, icon: '🎓', color: 'text-terminal-blue' },
          { label: 'Featured', value: stats.featured, icon: '⭐', color: 'text-terminal-yellow' },
          { label: 'Active', value: stats.active, icon: '✅', color: 'text-terminal-green' },
          { label: 'Lifetime', value: stats.lifetime, icon: '♾️', color: 'text-terminal-purple' }
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 border border-terminal-border rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search certificates... (try 'AWS', 'Node.js', 'Database')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-terminal-border rounded-lg font-mono text-terminal-text placeholder-gray-400 focus:border-terminal-green focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {certificateCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-terminal-green text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.icon} {category.name}
                <span className="bg-gray-700 text-xs px-2 py-1 rounded">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
          
          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-800 border border-terminal-border rounded px-3 py-1 text-sm text-gray-300 focus:border-terminal-green focus:outline-none"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
            </select>
            
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-1 bg-gray-800 border border-terminal-border rounded text-sm hover:bg-gray-700 transition-colors flex items-center gap-1"
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedAndFilteredCertificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-terminal-border rounded-lg overflow-hidden hover:border-terminal-green transition-colors cursor-pointer group"
              onClick={() => setSelectedCertificate(cert)}
            >
              {/* Certificate Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-terminal-green group-hover:text-terminal-yellow transition-colors line-clamp-2">
                      {cert.name}
                    </h3>
                    <p className="text-terminal-blue text-sm mt-1">{cert.issuer}</p>
                  </div>
                  {cert.featured && (
                    <span className="text-yellow-400 text-lg ml-2">⭐</span>
                  )}
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {cert.description}
                </p>

                {/* Certificate Details */}
                <div className="space-y-2 text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>Issued: {formatDate(cert.issueDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 ${getStatusColor(cert.status)}`}>
                      {getStatusIcon(cert.status)} {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span className="font-mono">ID: {cert.credentialId}</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-terminal-border text-xs rounded font-mono text-terminal-blue flex items-center gap-1"
                    >
                      <TechIcon 
                        technology={skill} 
                        size="sm"
                      />
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-xs rounded font-mono text-gray-400">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCertificate(cert);
                    }}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 px-3 py-1 bg-terminal-green text-black hover:bg-green-400 rounded text-xs transition-colors"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      Verify
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* No Results */}
      {sortedAndFilteredCertificates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl text-gray-400 mb-2">No certificates found</h3>
          <p className="text-gray-500">
            Try adjusting your search terms or category filter
          </p>
        </motion.div>
      )}

      {/* Certificate Detail Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-terminal-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gray-800 p-4 border-b border-terminal-border flex items-center justify-between">
                <h2 className="text-xl font-bold text-terminal-green flex items-center gap-2">
                  🏆 {selectedCertificate.name}
                </h2>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Certificate Image */}
                <div className="bg-gray-800 border border-terminal-border rounded-lg overflow-hidden">
                  {selectedCertificate.imageUrl ? (
                    <div className="relative">
                      <img
                        src={selectedCertificate.imageUrl}
                        alt={selectedCertificate.name}
                        className="w-full h-64 object-contain bg-gray-900"
                        onError={(e) => {
                          // Fallback jika gambar gagal dimuat
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="h-64 flex flex-col items-center justify-center bg-gray-900">
                                <div class="text-6xl mb-4">🎓</div>
                                <p class="text-gray-400">Certificate Image</p>
                                <p class="text-sm text-gray-500 mt-1">${selectedCertificate.imageUrl}</p>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center bg-gray-900">
                      <div className="text-6xl mb-4">🎓</div>
                      <p className="text-gray-400">Certificate Image</p>
                      <p className="text-sm text-gray-500 mt-1">No image available</p>
                    </div>
                  )}
                </div>

                {/* Certificate Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-terminal-yellow mb-2">Certificate Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Issuer:</span>
                          <span className="text-terminal-blue font-medium">{selectedCertificate.issuer}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Issue Date:</span>
                          <span className="text-terminal-text">{formatDate(selectedCertificate.issueDate)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span className={`flex items-center gap-1 ${getStatusColor(selectedCertificate.status)}`}>
                            {getStatusIcon(selectedCertificate.status)} {selectedCertificate.status.charAt(0).toUpperCase() + selectedCertificate.status.slice(1)}
                          </span>
                        </div>
                        {selectedCertificate.expiryDate && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Expires:</span>
                            <span className="text-terminal-yellow">{formatDate(selectedCertificate.expiryDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Credential ID */}
                    <div>
                      <h4 className="text-terminal-yellow font-semibold mb-2">Credential ID</h4>
                      <div className="flex items-center gap-2 p-3 bg-gray-800 rounded font-mono text-sm">
                        <span className="flex-1">{selectedCertificate.credentialId}</span>
                        <button
                          onClick={() => copyToClipboard(selectedCertificate.credentialId, 'credential')}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                        >
                          {copiedField === 'credential' ? (
                            <Check className="w-4 h-4 text-terminal-green" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Skills & Description */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-terminal-yellow font-semibold mb-2">Description</h4>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {selectedCertificate.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-terminal-yellow font-semibold mb-2">Skills Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertificate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-terminal-border rounded-full text-sm font-mono text-terminal-blue"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-terminal-border">
                  {selectedCertificate.verificationUrl && (
                    <a
                      href={selectedCertificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-terminal-green text-black hover:bg-green-400 rounded transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Verify Certificate
                    </a>
                  )}
                  <button
                    onClick={() => copyToClipboard(selectedCertificate.verificationUrl || '', 'url')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                  >
                    {copiedField === 'url' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>

                {/* Terminal Output */}
                <div className="bg-gray-800 border border-terminal-border rounded-lg p-4">
                  <div className="font-mono text-sm">
                    <div className="text-terminal-green">$ verify --certificate {selectedCertificate.credentialId}</div>
                    <div className="text-gray-300">Credential verified ✅</div>
                    <div className="text-gray-300">Issuer: {selectedCertificate.issuer}</div>
                    <div className="text-gray-300">Status: {selectedCertificate.status}</div>
                    <div className="text-terminal-green">miyakoai@portfolio:~$ </div>
                    <span className="animate-blink">█</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Certificates;