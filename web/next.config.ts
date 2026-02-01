const nextConfig = {
    // Note: Remove 'output: export' for Vercel deployment
    // Use 'output: export' only when building for Capacitor mobile
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        // Enable optimization for Vercel
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/aida-public/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig
