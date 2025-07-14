// 认证工具类
const AuthUtils = {
    // 存储键名
    TOKEN_KEY: 'auth_token',
    USER_KEY: 'auth_user',
    REFRESH_KEY: 'auth_refresh',
    EXPIRY_KEY: 'auth_expiry',

    // 检查是否已认证
    isAuthenticated() {
        try {
            const token = localStorage.getItem(this.TOKEN_KEY);
            const user = localStorage.getItem(this.USER_KEY);
            return !!(token && user && !this.isTokenExpired());
        } catch (error) {
            console.error('检查认证状态失败:', error);
            return false;
        }
    },

    // 检查token是否过期
    isTokenExpired() {
        try {
            const expiry = localStorage.getItem(this.EXPIRY_KEY);
            if (!expiry) return true;
            
            const expiryTime = parseInt(expiry);
            const currentTime = Date.now();
            
            // 提前5分钟判断为过期，给刷新token留时间
            return currentTime >= (expiryTime - 5 * 60 * 1000);
        } catch (error) {
            console.error('检查token过期状态失败:', error);
            return true;
        }
    },

    // 获取当前用户信息
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem(this.USER_KEY);
            const token = localStorage.getItem(this.TOKEN_KEY);
            
            if (!userStr || !token) return null;
            
            const user = JSON.parse(userStr);
            user.token = token;
            
            return user;
        } catch (error) {
            console.error('获取用户信息失败:', error);
            return null;
        }
    },

    // 保存认证信息
    saveAuth(userData) {
        try {
            if (!userData || !userData.token) {
                console.error('无效的用户数据');
                return false;
            }

            // 计算过期时间（默认24小时）
            const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
            
            // 保存token
            localStorage.setItem(this.TOKEN_KEY, userData.token);
            
            // 保存用户信息（不包含token）
            const userInfo = { ...userData };
            delete userInfo.token;
            localStorage.setItem(this.USER_KEY, JSON.stringify(userInfo));
            
            // 保存过期时间
            localStorage.setItem(this.EXPIRY_KEY, expiryTime.toString());
            
            // 保存刷新token（如果有）
            if (userData.refreshToken) {
                localStorage.setItem(this.REFRESH_KEY, userData.refreshToken);
            }

            console.log('认证信息保存成功');
            return true;
        } catch (error) {
            console.error('保存认证信息失败:', error);
            return false;
        }
    },

    // 清除认证信息
    clearAuth() {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem(this.USER_KEY);
            localStorage.removeItem(this.REFRESH_KEY);
            localStorage.removeItem(this.EXPIRY_KEY);
            
            // 清除其他可能的认证相关数据
            localStorage.removeItem('lastLoginTime');
            localStorage.removeItem('userPermissions');
            localStorage.removeItem('userRoles');
            
            console.log('认证信息已清除');
            return true;
        } catch (error) {
            console.error('清除认证信息失败:', error);
            return false;
        }
    },

    // 刷新认证状态
    refreshAuth() {
        try {
            // 简单的刷新逻辑，实际项目中应该调用后端API
            if (this.isTokenExpired()) {
                console.log('Token已过期，需要重新登录');
                return false;
            }
            
            const user = this.getCurrentUser();
            if (!user) {
                console.log('用户信息无效，需要重新登录');
                return false;
            }
            
            // 更新最后活动时间
            localStorage.setItem('lastActivity', Date.now().toString());
            
            return true;
        } catch (error) {
            console.error('刷新认证状态失败:', error);
            return false;
        }
    },

    // 获取认证header
    getAuthHeader() {
        try {
            const token = localStorage.getItem(this.TOKEN_KEY);
            if (!token) return null;
            
            return {
                'Authorization': Bearer ,
                'Content-Type': 'application/json'
            };
        } catch (error) {
            console.error('获取认证header失败:', error);
            return null;
        }
    },

    // 模拟登录（用于演示）
    demoLogin(username, password) {
        try {
            // 演示用的简单验证
            const validCredentials = [
                { username: 'admin', password: 'admin123', role: 'admin', name: '系统管理员' },
                { username: 'operator', password: 'op123', role: 'operator', name: '运营人员' },
                { username: 'reviewer', password: 'review123', role: 'reviewer', name: '审核员' }
            ];

            const user = validCredentials.find(u => u.username === username && u.password === password);
            
            if (user) {
                const userData = {
                    username: user.username,
                    name: user.name,
                    role: user.role,
                    token: this.generateDemoToken(),
                    refreshToken: this.generateDemoRefreshToken(),
                    loginTime: new Date().toISOString(),
                    permissions: this.getRolePermissions(user.role)
                };

                this.saveAuth(userData);
                return userData;
            }
            
            return null;
        } catch (error) {
            console.error('演示登录失败:', error);
            return null;
        }
    },

    // 生成演示token
    generateDemoToken() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 64; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    },

    // 生成演示refresh token
    generateDemoRefreshToken() {
        return 'refresh_' + this.generateDemoToken();
    },

    // 获取角色权限
    getRolePermissions(role) {
        const permissions = {
            admin: ['create', 'read', 'update', 'delete', 'manage_users', 'system_settings'],
            operator: ['create', 'read', 'update', 'content_manage', 'data_analysis'],
            reviewer: ['read', 'review', 'approve', 'content_audit']
        };
        
        return permissions[role] || ['read'];
    },

    // 检查权限
    hasPermission(permission) {
        try {
            const user = this.getCurrentUser();
            if (!user || !user.permissions) return false;
            
            return user.permissions.includes(permission);
        } catch (error) {
            console.error('检查权限失败:', error);
            return false;
        }
    }
};

// 确保AuthUtils在全局可用
window.AuthUtils = AuthUtils;

console.log('AuthUtils工具类已加载');
