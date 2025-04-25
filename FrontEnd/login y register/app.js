// Configuración global para axios
axios.defaults.withCredentials = true; // Permite enviar cookies en solicitudes cross-origin

// Configuración Global
const API_BASE_URL = 'http://localhost:8080/api';
let currentToken = null;
let currentUser = null;

// Elementos DOM principales
const loginForm = document.getElementById('login-form-element');
const registerForm = document.getElementById('register-form-element');
const authContainer = document.getElementById('auth-container');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const overlay = document.getElementById('overlay');
const navMenu = document.getElementById('nav-menu');
const sidebarUser = document.getElementById('sidebar-user');

// Elementos de navegación
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const loginBtn = document.getElementById('login-btn');
const logoutLink = document.getElementById('logout-link');
const navLinks = document.querySelectorAll('.nav-link');

// Tabs de autenticación
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

// Secciones de contenido
const dashboardSection = document.getElementById('dashboard-section');
const clientsSection = document.getElementById('clients-section');
const menuSection = document.getElementById('menu-section');
const ordersSection = document.getElementById('orders-section');
const staffSection = document.getElementById('staff-section');
const profileSection = document.getElementById('profile-section');
const jwtInfoSection = document.getElementById('jwt-info-section');

// Alertas
const loginAlert = document.getElementById('login-alert');
const registerAlert = document.getElementById('register-alert');
const dashboardAlert = document.getElementById('dashboard-alert');
const clientsAlert = document.getElementById('clients-alert');
const menuAlert = document.getElementById('menu-alert');
const ordersAlert = document.getElementById('orders-alert');
const staffAlert = document.getElementById('staff-alert');
const profileAlert = document.getElementById('profile-alert');

// Contenedores de elementos dinámicos
const clientsContainer = document.getElementById('clients-container');
const dishesContainer = document.getElementById('dishes-container');
const ordersContainer = document.getElementById('orders-container');
const employeesContainer = document.getElementById('employees-container');
const recentOrders = document.getElementById('recent-orders');
const popularDishes = document.getElementById('popular-dishes');

// Contadores del dashboard
const clientCount = document.getElementById('client-count');
const dishCount = document.getElementById('dish-count');
const orderCount = document.getElementById('order-count');
const employeeCount = document.getElementById('employee-count');

// Botones de modal
const addClientBtn = document.getElementById('add-client-btn');
const addDishBtn = document.getElementById('add-dish-btn');
const addOrderBtn = document.getElementById('add-order-btn');
const addEmployeeBtn = document.getElementById('add-employee-btn');

// Información JWT
const jwtToken = document.getElementById('jwt-token');
const jwtParts = document.getElementById('jwt-parts');
const jwtHeader = document.getElementById('jwt-header');
const jwtPayload = document.getElementById('jwt-payload');
const jwtSignature = document.getElementById('jwt-signature');
const decodeTokenBtn = document.getElementById('decode-token-btn');

// Botones de prueba de endpoints
const testPublicBtn = document.getElementById('test-public-btn');
const testClientBtn = document.getElementById('test-client-btn');
const testStaffBtn = document.getElementById('test-staff-btn');
const testAdminBtn = document.getElementById('test-admin-btn');
const endpointResult = document.getElementById('endpoint-result');

// Modales
const clientModal = document.getElementById('client-modal');
const dishModal = document.getElementById('dish-modal');
const orderModal = document.getElementById('order-modal');
const employeeModal = document.getElementById('employee-modal');
const deleteModal = document.getElementById('delete-modal');

// Eventos iniciales
document.addEventListener('DOMContentLoaded', init);

// Funciones de inicialización
function init() {
    // Comprobar si hay un token almacenado
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
        currentToken = storedToken;
        checkTokenValidity();
    }

    // Configurar eventos
    setupEventListeners();
}

function setupEventListeners() {
    // Navegación y UI
    toggleSidebarBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', closeSidebar);
    loginBtn.addEventListener('click', showAuthForms);
    logoutLink.addEventListener('click', logout);

    // Navegación entre secciones
    navLinks.forEach(link => {
        if (link.id !== 'logout-link') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                showSection(section);
            });
        }
    });

    // Tabs de autenticación
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const formId = tab.getAttribute('data-tab');
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(formId).classList.add('active');
        });
    });

    // Formularios de autenticación
    loginForm.addEventListener('submit', login);
    registerForm.addEventListener('submit', register);

    // Botones CRUD
    addClientBtn.addEventListener('click', showClientModal);
    addDishBtn.addEventListener('click', showDishModal);
    addOrderBtn.addEventListener('click', showOrderModal);
    addEmployeeBtn.addEventListener('click', showEmployeeModal);

    // JWT Info
    decodeTokenBtn.addEventListener('click', decodeJwt);

    // Test endpoints
    testPublicBtn.addEventListener('click', () => testEndpoint('public'));
    testClientBtn.addEventListener('click', () => testEndpoint('client'));
    testStaffBtn.addEventListener('click', () => testEndpoint('staff'));
    testAdminBtn.addEventListener('click', () => testEndpoint('admin'));

    // Configurar modales
    setupModals();
}

function setupModals() {
    // Modal de cliente
    document.getElementById('client-modal-close').addEventListener('click', () => hideModal(clientModal));
    document.getElementById('client-cancel-btn').addEventListener('click', () => hideModal(clientModal));
    document.getElementById('client-save-btn').addEventListener('click', saveClient);

    // Modal de plato
    document.getElementById('dish-modal-close').addEventListener('click', () => hideModal(dishModal));
    document.getElementById('dish-cancel-btn').addEventListener('click', () => hideModal(dishModal));
    document.getElementById('dish-save-btn').addEventListener('click', saveDish);

    // Modal de pedido
    document.getElementById('order-modal-close').addEventListener('click', () => hideModal(orderModal));
    document.getElementById('order-cancel-btn').addEventListener('click', () => hideModal(orderModal));
    document.getElementById('order-save-btn').addEventListener('click', saveOrder);
    document.getElementById('order-save-btn').addEventListener('click', saveOrder);
    document.getElementById('add-order-item-btn').addEventListener('click', addOrderItem);
    
        // Modal de empleado
        document.getElementById('employee-modal-close').addEventListener('click', () => hideModal(employeeModal));
        document.getElementById('employee-cancel-btn').addEventListener('click', () => hideModal(employeeModal));
        document.getElementById('employee-save-btn').addEventListener('click', saveEmployee);
    
        // Modal de confirmación de eliminación
        document.getElementById('delete-modal-close').addEventListener('click', () => hideModal(deleteModal));
        document.getElementById('delete-cancel-btn').addEventListener('click', () => hideModal(deleteModal));
        document.getElementById('delete-confirm-btn').addEventListener('click', confirmDelete);
    }
    
    // Funciones de UI
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        mainContent.classList.toggle('sidebar-active');
    }
    
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        mainContent.classList.remove('sidebar-active');
    }
    
    function showAuthForms() {
        authContainer.style.display = 'block';
        dashboardSection.classList.add('d-none');
        clientsSection.classList.add('d-none');
        menuSection.classList.add('d-none');
        ordersSection.classList.add('d-none');
        staffSection.classList.add('d-none');
        profileSection.classList.add('d-none');
        jwtInfoSection.classList.add('d-none');
    }
    
    function showSection(section) {
        // Ocultar todas las secciones
        const sections = [
            dashboardSection,
            clientsSection,
            menuSection,
            ordersSection,
            staffSection,
            profileSection,
            jwtInfoSection
        ];
        sections.forEach(s => s.classList.add('d-none'));
        
        // Mostrar la sección seleccionada
        const sectionToShow = document.getElementById(`${section}-section`);
        if (sectionToShow) {
            sectionToShow.classList.remove('d-none');
            
            // Actualizar el enlace activo
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === section) {
                    link.classList.add('active');
                }
            });
            
            // Cargar datos según la sección
            switch (section) {
                case 'dashboard':
                    loadDashboardData();
                    break;
                case 'clients':
                    loadClients();
                    break;
                case 'menu':
                    loadMenu();
                    break;
                case 'orders':
                    loadOrders();
                    break;
                case 'staff':
                    loadStaff();
                    break;
                case 'profile':
                    loadProfile();
                    break;
                case 'jwt-info':
                    loadJwtInfo();
                    break;
            }
            
            // Cerrar sidebar en móvil
            if (window.innerWidth < 992) {
                closeSidebar();
            }
        }
    }
    
    // Mostrar/Ocultar modales
    function showModal(modal) {
        modal.classList.add('active');
        setTimeout(() => {
            modal.querySelector('.modal-dialog').style.transform = 'scale(1)';
            modal.querySelector('.modal-dialog').style.opacity = '1';
        }, 10);
    }
    
    function hideModal(modal) {
        modal.querySelector('.modal-dialog').style.transform = 'scale(0.9)';
        modal.querySelector('.modal-dialog').style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('active');
        }, 300);
    }
    
    // Mostrar alertas
    function showAlert(alertElement, message, type = 'danger') {
        alertElement.innerHTML = `
            <div class="alert alert-${type} alert-dismissible">
                ${message}
                <button type="button" class="close" onclick="this.parentElement.remove()">&times;</button>
            </div>
        `;
    }
    
    // Autenticación y JWT
    async function login(e) {
        e.preventDefault();
        
        
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const recaptchaToken = document.getElementById('recaptcha-token').value;
        
        try {

             // Obtener un token real de reCAPTCHA
        const recaptchaToken = await getReCaptchaToken('login');
        
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, {
            usernameOrEmail: username,
            password: password,
            recaptchaToken: recaptchaToken
        },{
            withCredentials: true
        });

            
            // Guardar token
            currentToken = response.data.token;
            localStorage.setItem('jwtToken', currentToken);
            
            // Guardar información del usuario
            currentUser = {
                id: response.data.id,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                username: response.data.username,
                email: response.data.email,
                roles: response.data.roles
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Actualizar UI
            updateUserUI();
            
            // Mostrar dashboard
            authContainer.style.display = 'none';
            showSection('dashboard');
            
            // Limpiar formulario
            loginForm.reset();
            
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
            showAlert(
                loginAlert, 
                `<i class="fas fa-exclamation-circle"></i> ${error.response?.data?.message || 'Error al iniciar sesión. Verifique sus credenciales.'}`
            );
        }
    }

    function getReCaptchaToken(action) {
        return new Promise((resolve, reject) => {
            grecaptcha.ready(function() {
                grecaptcha.execute('6LcoqyQrAAAAADLJV4a9Mt4Px9uNYnyPW5PkGND4', {action: action})
                .then(function(token) {
                    resolve(token);
                })
                .catch(function(error) {
                    reject(error);
                });
            });
        });
    }
    
    async function register(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('register-firstname').value;
        const lastName = document.getElementById('register-lastname').value;
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const phone = document.getElementById('register-phone').value;
        const recaptchaToken = document.getElementById('register-recaptcha-token').value;
        
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password,
                phone: phone,
                roles: ["client"], // Por defecto, asignamos el rol de cliente
                recaptchaToken: recaptchaToken
            });
            
            // Mostrar mensaje de éxito
            showAlert(
                registerAlert, 
                `<i class="fas fa-check-circle"></i> ${response.data.message}. Ahora puede iniciar sesión.`,
                'success'
            );
            
            // Cambiar a la pestaña de inicio de sesión
            setTimeout(() => {
                authTabs[0].click();
                registerForm.reset();
            }, 2000);
            
        } catch (error) {
            console.error('Error de registro:', error);
            showAlert(
                registerAlert, 
                `<i class="fas fa-exclamation-circle"></i> ${error.response?.data?.message || 'Error al registrarse. Intente nuevamente.'}`
            );
        }
    }
    
    async function logout() {
        try {
            await axios.post(`${API_BASE_URL}/auth/signout`);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            // Limpiar información local
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('currentUser');
            currentToken = null;
            currentUser = null;
            
            // Actualizar UI
            updateUserUI();
            
            // Mostrar formulario de login
            showAuthForms();
        }
    }
    
    async function checkTokenValidity() {
        try {
            // Configurar Axios para usar el token
            
            
            // Intenta obtener información del usuario
            const response = await axios.get(`${API_BASE_URL}/auth/user`);
            
            // Si hay respuesta exitosa, el token es válido
            currentUser = response.data;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Actualizar UI
            updateUserUI();
            
            // Mostrar dashboard
            authContainer.style.display = 'none';
            showSection('dashboard');
            
        } catch (error) {
            console.error('Token inválido o expirado:', error);
            logout();
        }
    }
    
    function updateUserUI() {
        if (currentUser) {
            // Cambiar botón de login por información de usuario
            navMenu.innerHTML = `
                <div class="d-flex align-center gap-2">
                    <span class="badge badge-light">${getUserRoleBadge()}</span>
                    <span>${currentUser.firstName} ${currentUser.lastName}</span>
                </div>
            `;
            
            // Actualizar sidebar
            sidebarUser.innerHTML = `
                <div class="sidebar-avatar">
                    ${getInitials(currentUser.firstName, currentUser.lastName)}
                </div>
                <div>
                    <div class="sidebar-username">${currentUser.firstName} ${currentUser.lastName}</div>
                    <div class="sidebar-role">${getUserRoleBadge(false)}</div>
                </div>
            `;
            
            // Mostrar/ocultar elementos según el rol
            const isAdmin = currentUser.roles.includes('ROLE_ADMIN');
            const isStaff = currentUser.roles.includes('ROLE_STAFF') || isAdmin;
            
            // Ocultar staff section si no es admin o staff
            document.querySelector('.nav-link[data-section="staff"]').style.display = isAdmin ? 'flex' : 'none';
            
            // Deshabilitar botones de acción según permisos
            addClientBtn.disabled = !isStaff;
            addDishBtn.disabled = !isStaff;
            addEmployeeBtn.disabled = !isAdmin;
            
            // Mostrar sidebar
            sidebar.style.display = 'block';
        } else {
            // Restaurar botón de login
            navMenu.innerHTML = `
                <button class="btn btn-light" id="login-btn">
                    <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                </button>
            `;
            document.getElementById('login-btn').addEventListener('click', showAuthForms);
            
            // Ocultar sidebar
            sidebar.style.display = 'none';
        }
    }
    
    function getUserRoleBadge(withIcon = true) {
        if (!currentUser || !currentUser.roles) return '';
        
        let role = '';
        let color = '';
        let icon = '';
        
        if (currentUser.roles.includes('ROLE_ADMIN')) {
            role = 'Administrador';
            color = 'danger';
            icon = 'user-shield';
        } else if (currentUser.roles.includes('ROLE_STAFF')) {
            role = 'Staff';
            color = 'warning';
            icon = 'user-tie';
        } else {
            role = 'Cliente';
            color = 'info';
            icon = 'user';
        }
        
        return withIcon ? 
            `<i class="fas fa-${icon}"></i> ${role}` : 
            role;
    }
    
    function getInitials(firstName, lastName) {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    
    // JWT Info
    function decodeJwt() {
        if (!currentToken) {
            jwtToken.textContent = 'No hay token disponible. Inicie sesión primero.';
            return;
        }
        
        try {
            jwtToken.textContent = currentToken;
            
            // Dividir el token en sus tres partes
            const parts = currentToken.split('.');
            if (parts.length !== 3) {
                throw new Error('Token JWT inválido');
            }
            
            // Decodificar cada parte
            const header = JSON.parse(atob(parts[0]));
            const payload = JSON.parse(atob(parts[1]));
            
            // Mostrar partes decodificadas
            jwtHeader.textContent = JSON.stringify(header, null, 2);
            jwtPayload.textContent = JSON.stringify(payload, null, 2);
            jwtSignature.textContent = '(Firma codificada) ' + parts[2].substring(0, 20) + '...';
            
            // Mostrar sección de partes
            jwtParts.style.display = 'block';
            
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            jwtToken.textContent = 'Error al decodificar el token: ' + error.message;
            jwtParts.style.display = 'none';
        }
    }
    
    async function testEndpoint(type) {
        if (!currentToken && type !== 'public') {
            endpointResult.textContent = 'Debe iniciar sesión para acceder a endpoints protegidos.';
            return;
        }
        
        try {
            let url = '';
            switch (type) {
                case 'public':
                    url = `${API_BASE_URL}/public/test`;
                    break;
                case 'client':
                    url = `${API_BASE_URL}/clients`;
                    break;
                case 'staff':
                    url = `${API_BASE_URL}/menu`;
                    break;
                case 'admin':
                    url = `${API_BASE_URL}/employees`;
                    break;
            }
            
            const response = await axios.get(url, {
                headers: {
                    
                }
            });
            
            endpointResult.textContent = 'Acceso concedido!\n\n' + JSON.stringify(response.data, null, 2);
        } catch (error) {
            console.error(`Error al acceder al endpoint ${type}:`, error);
            endpointResult.textContent = `Acceso denegado: ${error.response?.status} ${error.response?.statusText}\n\n${error.response?.data?.message || error.message}`;
        }
    }
    
    // Cargar datos del Dashboard
    async function loadDashboardData() {
        if (!currentToken) return;
        
        try {
            // Carga de contadores
            await Promise.all([
                loadClientCount(),
                loadDishCount(),
                loadOrderCount(),
                loadEmployeeCount(),
                loadPopularDishes(),
                loadRecentOrders()
            ]);
            
        } catch (error) {
            console.error('Error al cargar datos del dashboard:', error);
            showAlert(
                dashboardAlert,
                `<i class="fas fa-exclamation-circle"></i> Error al cargar datos del dashboard: ${error.message}`
            );
        }
    }
    
    async function loadClientCount() {
        try {
            const response = await axios.get(`${API_BASE_URL}/clients`, {
                headers: {  }
            });
            clientCount.textContent = response.data.length;
        } catch (error) {
            console.error('Error al cargar conteo de clientes:', error);
            clientCount.textContent = '?';
        }
    }
    
    async function loadDishCount() {
        try {
            const response = await axios.get(`${API_BASE_URL}/menu`, {
                headers: {  }
            });
            dishCount.textContent = response.data.length;
        } catch (error) {
            console.error('Error al cargar conteo de platos:', error);
            dishCount.textContent = '?';
        }
    }
    
    async function loadOrderCount() {
        try {
            const response = await axios.get(`${API_BASE_URL}/orders`, {
                headers: {  }
            });
            orderCount.textContent = response.data.length;
        } catch (error) {
            console.error('Error al cargar conteo de pedidos:', error);
            orderCount.textContent = '?';
        }
    }
    
    async function loadEmployeeCount() {
        try {
            const response = await axios.get(`${API_BASE_URL}/employees`, {
                headers: {  }
            });
            employeeCount.textContent = response.data.length;
        } catch (error) {
            console.error('Error al cargar conteo de empleados:', error);
            employeeCount.textContent = '?';
        }
    }
    
    async function loadPopularDishes() {
        try {
            const response = await axios.get(`${API_BASE_URL}/menu`, {
                headers: {  }
            });
            
            // Limitamos a 5 platos para el ejemplo
            const dishes = response.data.slice(0, 5);
            
            // Generar HTML para la tabla
            popularDishes.innerHTML = dishes.map(dish => `
                <tr>
                    <td>${dish.name}</td>
                    <td>$${dish.price.toFixed(2)}</td>
                    <td>${Math.floor(Math.random() * 100)}</td>
                </tr>
            `).join('');
            
        } catch (error) {
            console.error('Error al cargar platos populares:', error);
            popularDishes.innerHTML = '<tr><td colspan="3">Error al cargar datos</td></tr>';
        }
    }
    
    async function loadRecentOrders() {
        try {
            const response = await axios.get(`${API_BASE_URL}/orders`, {
                headers: {  }
            });
            
            // Limitamos a 5 pedidos para el ejemplo
            const orders = response.data.slice(0, 5);
            
            // Cargar información de clientes
            const clientsResponse = await axios.get(`${API_BASE_URL}/clients`, {
                headers: {  }
            });
            const clients = clientsResponse.data;
            
            // Generar HTML para la tabla
            recentOrders.innerHTML = await Promise.all(orders.map(async order => {
                const client = clients.find(c => c.idClient === order.idCustomer) || { firstName: 'Cliente', lastName: 'Desconocido' };
                
                // Obtener detalles del pedido para calcular el total
                let total = 0;
                try {
                    const detailsResponse = await axios.get(`${API_BASE_URL}/order-details/order/${order.idOrder}`, {
                        headers: {  }
                    });
                    
                    total = detailsResponse.data.reduce((sum, detail) => sum + (detail.price * detail.quantity), 0);
                } catch (error) {
                    console.error('Error al cargar detalles del pedido:', error);
                }
                
                return `
                    <tr>
                        <td>#${order.idOrder}</td>
                        <td>${client.firstName} ${client.lastName}</td>
                        <td>${formatDate(order.date)}</td>
                        <td>$${total.toFixed(2)}</td>
                        <td><span class="badge badge-${getStatusBadgeColor(order.status)}">${order.status}</span></td>
                        <td>
                            <button class="btn btn-info btn-sm" onclick="viewOrder(${order.idOrder})">
                                <i class="fas fa-eye"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }));
            
        } catch (error) {
            console.error('Error al cargar pedidos recientes:', error);
            recentOrders.innerHTML = '<tr><td colspan="6">Error al cargar datos</td></tr>';
        }
    }
    
    // Cargar y mostrar clientes
    async function loadClients() {
        if (!currentToken) return;
        
        try {
            const response = await axios.get(`${API_BASE_URL}/clients`, {
                headers: {  }
            });
            
            const clients = response.data;
            
            if (clients.length === 0) {
                clientsContainer.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon"><i class="fas fa-users"></i></div>
                        <h3 class="empty-title">No hay clientes</h3>
                        <p class="empty-description">No se encontraron clientes en el sistema.</p>
                        <button class="btn btn-primary" onclick="showClientModal()">
                            <i class="fas fa-user-plus"></i> Agregar Cliente
                        </button>
                    </div>
                `;
                return;
            }
            
            clientsContainer.innerHTML = clients.map(client => `
                <div class="person-card">
                    <div class="person-avatar">
                        ${getInitials(client.firstName || '', client.lastName || '')}
                    </div>
                    <div class="person-info">
                        <h3 class="person-name">${client.firstName} ${client.lastName}</h3>
                        <div class="person-details">
                            <div class="person-detail">
                                <i class="fas fa-envelope"></i> ${client.email || 'No disponible'}
                            </div>
                            <div class="person-detail">
                                <i class="fas fa-phone"></i> ${client.phone || 'No disponible'}
                            </div>
                        </div>
                    </div>
                    <div class="person-actions">
                        <button class="btn btn-info btn-icon" onclick="viewClient(${client.idClient})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-primary btn-icon" onclick="editClient(${client.idClient})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-icon" onclick="deleteClient(${client.idClient})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error al cargar clientes:', error);
            showAlert(
                clientsAlert,
                `<i class="fas fa-exclamation-circle"></i> Error al cargar clientes: ${error.message}`
            );
        }
    }
    
    // Cargar y mostrar menú
    async function loadMenu() {
        if (!currentToken) return;
        
        try {
            const response = await axios.get(`${API_BASE_URL}/menu`, {
                headers: {  }
            });
            
            const dishes = response.data;
            
            if (dishes.length === 0) {
                dishesContainer.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon"><i class="fas fa-utensils"></i></div>
                        <h3 class="empty-title">No hay platos</h3>
                        <p class="empty-description">No se encontraron platos en el menú.</p>
                        <button class="btn btn-primary" onclick="showDishModal()">
                            <i class="fas fa-plus"></i> Agregar Plato
                        </button>
                    </div>
                `;
                return;
            }
            
            dishesContainer.innerHTML = dishes.map(dish => `
                <div class="menu-item">
                    <div class="menu-item-image">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <div class="menu-item-content">
                        <h3 class="menu-item-title">${dish.name}</h3>
                        <p class="menu-item-description">${dish.description || 'Sin descripción'}</p>
                    </div>
                    <div class="menu-item-price">
                        <div>$${dish.price.toFixed(2)}</div>
                        <div class="person-actions mt-2">
                            <button class="btn btn-info btn-icon" onclick="viewDish(${dish.idDish})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-primary btn-icon" onclick="editDish(${dish.idDish})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-icon" onclick="deleteDish(${dish.idDish})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error al cargar menú:', error);
            showAlert(
                menuAlert,
                `<i class="fas fa-exclamation-circle"></i> Error al cargar menú: ${error.message}`
            );
        }
    }
    
    // Cargar y mostrar pedidos
    async function loadOrders() {
        if (!currentToken) return;
        
        try {
            const response = await axios.get(`${API_BASE_URL}/orders`, {
                headers: {  }
            });
            
            const orders = response.data;
            
            if (orders.length === 0) {
                ordersContainer.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon"><i class="fas fa-clipboard-list"></i></div>
                        <h3 class="empty-title">No hay pedidos</h3>
                        <p class="empty-description">No se encontraron pedidos en el sistema.</p>
                        <button class="btn btn-primary" onclick="showOrderModal()">
                            <i class="fas fa-plus"></i> Crear Pedido
                        </button>
                    </div>
                `;
                return;
            }
            
            // Cargar información de clientes
            const clientsResponse = await axios.get(`${API_BASE_URL}/clients`, {
                headers: {  }
            });
            const clients = clientsResponse.data;
            
            let orderCards = '';
            
            for (const order of orders) {
                const client = clients.find(c => c.idClient === order.idCustomer) || { firstName: 'Cliente', lastName: 'Desconocido' };
                
                // Obtener detalles del pedido
                let orderDetails = [];
                let total = 0;
                
                try {
                    const detailsResponse = await axios.get(`${API_BASE_URL}/order-details/order/${order.idOrder}`, {
                        headers: {  }
                    });
                    orderDetails = detailsResponse.data;
                    
                    // Obtener información de platos
                    const dishesResponse = await axios.get(`${API_BASE_URL}/menu`, {
                        headers: {  }
                    });
                    const dishes = dishesResponse.data;
                    
                    // Generar HTML para los detalles
                    let detailsHtml = '';
                    
                    for (const detail of orderDetails) {
                        const dish = dishes.find(d => d.idDish === detail.idDish) || { name: 'Plato desconocido' };
                        total += detail.price * detail.quantity;
                        
                        detailsHtml += `
                            <div class="order-item">
                                <div class="order-item-name">${dish.name}</div>
                                <div class="order-item-quantity">x${detail.quantity}</div>
                                <div class="order-item-price">$${(detail.price * detail.quantity).toFixed(2)}</div>
                            </div>
                        `;
                    }
                    
                    orderCards += `
                        <div class="order-card">
                            <div class="order-card-header">
                                <div class="order-id">Pedido #${order.idOrder}</div>
                                <div class="order-date">${formatDate(order.date)}</div>
                            </div>
                            <div class="order-card-body">
                                <div class="mb-3">
                                    <strong>Cliente:</strong> ${client.firstName} ${client.lastName}
                                </div>
                                <div class="mb-3">
                                    <strong>Estado:</strong> 
                                    <span class="badge badge-${getStatusBadgeColor(order.status)}">${order.status}</span>
                                </div>
                                <div>
                                    <strong>Detalle:</strong>
                                    ${detailsHtml}
                                </div>
                                <div class="order-total">
                                    <span>Total:</span>
                                    <span>$${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <div class="order-card-footer">
                                <div>
                                    <button class="btn btn-warning btn-sm" onclick="updateOrderStatus(${order.idOrder}, '${order.status}')">
                                        <i class="fas fa-sync-alt"></i> Cambiar Estado
                                    </button>
                                </div>
                                <div>
                                    <button class="btn btn-info btn-sm" onclick="viewOrder(${order.idOrder})">
                                        <i class="fas fa-eye"></i> Ver
                                    </button>
                                    <button class="btn btn-primary btn-sm" onclick="editOrder(${order.idOrder})">
                                        <i class="fas fa-edit"></i> Editar
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="deleteOrder(${order.idOrder})">
                                        <i class="fas fa-trash"></i> Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                } catch (error) {
                    console.error('Error al cargar detalles del pedido:', error);
                    continue;
                }
            }
            
            ordersContainer.innerHTML = orderCards;
            
        } catch (error) {
            console.error('Error al cargar pedidos:', error);
            showAlert(
                ordersAlert,
                `<i class="fas fa-exclamation-circle"></i> Error al cargar pedidos: ${error.message}`
            );
        }
    }
    
    // Cargar y mostrar personal
    async function loadStaff() {
        if (!currentToken) return;
        
        try {
            const response = await axios.get(`${API_BASE_URL}/employees`, {
                headers: {  }
            });
            
            const employees = response.data;
            
            if (employees.length === 0) {
                employeesContainer.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon"><i class="fas fa-user-tie"></i></div>
                        <h3 class="empty-title">No hay empleados</h3>
                        <p class="empty-description">No se encontraron empleados en el sistema.</p>
                        <button class="btn btn-primary" onclick="showEmployeeModal()">
                            <i class="fas fa-user-plus"></i> Agregar Empleado
                        </button>
                    </div>
                `;
                return;
            }
            
            employeesContainer.innerHTML = employees.map(employee => `
                <div class="person-card">
                    <div class="person-avatar">
                        ${getInitials(employee.firstName || '', employee.lastName || '')}
                    </div>
                    <div class="person-info">
                        <h3 class="person-name">${employee.firstName} ${employee.lastName}</h3>
                        <div class="person-details">
                            <div class="person-detail">
                                <i class="fas fa-briefcase"></i> ${employee.position || 'No disponible'}
                            </div>
                            <div class="person-detail">
                                <i class="fas fa-dollar-sign"></i> $${employee.salary.toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <div class="person-actions">
                        <button class="btn btn-info btn-icon" onclick="viewEmployee(${employee.idEmployee})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-primary btn-icon" onclick="editEmployee(${employee.idEmployee})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-icon" onclick="deleteEmployee(${employee.idEmployee})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error al cargar empleados:', error);
            showAlert(
                staffAlert,
                `<i class="fas fa-exclamation-circle"></i> Error al cargar empleados: ${error.message}`
            );
        }
    }
    
    // Cargar perfil de usuario
    async function loadProfile() {
        if (!currentToken || !currentUser) return;
        
        try {
            // Obtener información de usuario actualizada
            const response = await axios.get(`${API_BASE_URL}/auth/user`, {
                headers: {  }
            });
            
            const user = response.data;
            
            // Actualizar formulario
            document.getElementById('profile-firstname').value = user.firstName || '';
            document.getElementById('profile-lastname').value = user.lastName || '';
            document.getElementById('profile-username').value = user.username || '';
            document.getElementById('profile-email').value = user.email || '';
            document.getElementById('profile-phone').value = user.phone || '';
            document.getElementById('profile-position').value = user.position || '';
            
        } catch (error) {
            console.error('Error al cargar perfil:', error);
            showAlert(
                profileAlert,
                `<i class="fas fa-exclamation-circle"></i> Error al cargar perfil: ${error.message}`
            );
        }
    }
    
    // Cargar información JWT
    function loadJwtInfo() {
        if (!currentToken) {
            jwtToken.textContent = 'No hay token disponible. Inicie sesión primero.';
            return;
        }
        
        jwtToken.textContent = currentToken;
    }
    
    // Funciones para modal de cliente
    function showClientModal(clientId = null) {
        document.getElementById('client-form').reset();
        document.getElementById('client-id').value = '';
        document.getElementById('client-modal-title').textContent = 'Nuevo Cliente';
        
        if (clientId) {
            document.getElementById('client-modal-title').textContent = 'Editar Cliente';
            document.getElementById('client-id').value = clientId;
            
            // Cargar datos del cliente
            loadClientData(clientId);
        }
        
        showModal(clientModal);
    }
    
    async function loadClientData(clientId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/clients/${clientId}`, {
                headers: {  }
            });
            
            const client = response.data;
            
            document.getElementById('client-firstname').value = client.firstName || '';
            document.getElementById('client-lastname').value = client.lastName || '';
            document.getElementById('client-phone').value = client.phone || '';
            document.getElementById('client-email').value = client.email || '';
            
        } catch (error) {
            console.error('Error al cargar datos del cliente:', error);
            showAlert(
                document.getElementById('client-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Error al cargar datos del cliente: ${error.message}`
            );
        }
    }
    
    async function saveClient() {
        const clientId = document.getElementById('client-id').value;
        const firstName = document.getElementById('client-firstname').value;
        const lastName = document.getElementById('client-lastname').value;
        const phone = document.getElementById('client-phone').value;
        const email = document.getElementById('client-email').value;
        
        const clientData = {
            firstName,
            lastName,
            phone,
            email
        };
        
        try {
            if (clientId) {
                // Actualizar cliente existente
                await axios.put(`${API_BASE_URL}/clients/${clientId}`, clientData, {
                    headers: {  }
                });
                
                showAlert(
                    clientsAlert,
                    `<i class="fas fa-check-circle"></i> Cliente actualizado correctamente.`,
                    'success'
                );
            } else {
                // Crear nuevo cliente
                await axios.post(`${API_BASE_URL}/clients`, clientData, {
                    headers: {  }
                });
                
                showAlert(
                    clientsAlert,
                    `<i class="fas fa-check-circle"></i> Cliente creado correctamente.`,
                    'success'
                );
            }
            
            // Cerrar modal y recargar clientes
            hideModal(clientModal);
            loadClients();
            
        } catch (error) {
            console.error('Error al guardar cliente:', error);
            showAlert(
                document.getElementById('client-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Error al guardar cliente: ${error.response?.data || error.message}`
            );
        }
    }
    
    function viewClient(clientId) {
        // En una aplicación real, aquí cargaríamos los detalles completos
        editClient(clientId);
    }
    
    function editClient(clientId) {
        showClientModal(clientId);
    }
    
    function deleteClient(clientId) {
        document.getElementById('delete-id').value = clientId;
        document.getElementById('delete-type').value = 'client';
        document.getElementById('delete-message').textContent = '¿Está seguro de que desea eliminar este cliente? Esta acción no se puede deshacer.';
        
        showModal(deleteModal);
    }
    
    // Funciones para modal de plato
    function showDishModal(dishId = null) {
        document.getElementById('dish-form').reset();
        document.getElementById('dish-id').value = '';
        document.getElementById('dish-modal-title').textContent = 'Nuevo Plato';
        
        if (dishId) {
            document.getElementById('dish-modal-title').textContent = 'Editar Plato';
            document.getElementById('dish-id').value = dishId;
            
            // Cargar datos del plato
            loadDishData(dishId);
        }
        
        showModal(dishModal);
    }
    
    async function loadDishData(dishId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/menu/${dishId}`, {
                headers: {  }
            });
            
            const dish = response.data;
            
            document.getElementById('dish-name').value = dish.name || '';
            document.getElementById('dish-description').value = dish.description || '';
            document.getElementById('dish-price').value = dish.price || 0;
            
        } catch (error) {
            console.error('Error al cargar datos del plato:', error);
            showAlert(
                document.getElementById('dish-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Error al cargar datos del plato: ${error.message}`
            );
        }
    }
    
    async function saveDish() {
        const dishId = document.getElementById('dish-id').value;
        const name = document.getElementById('dish-name').value;
        const description = document.getElementById('dish-description').value;
        const price = document.getElementById('dish-price').value;
        
        const dishData = {
            name,
            description,
            price: parseFloat(price)
        };
        
        try {
            if (dishId) {
                // Actualizar plato existente
                dishData.idDish = parseInt(dishId);
                await axios.put(`${API_BASE_URL}/menu/${dishId}`, dishData, {
                    headers: {  }
                });
                
                showAlert(
                    menuAlert,
                    `<i class="fas fa-check-circle"></i> Plato actualizado correctamente.`,
                    'success'
                );
            } else {
                // Crear nuevo plato
                await axios.post(`${API_BASE_URL}/menu`, dishData, {
                    headers: {  }
                });
                
                showAlert(
                    menuAlert,
                    `<i class="fas fa-check-circle"></i> Plato creado correctamente.`,
                    'success'
                );
            }
            
            // Cerrar modal y recargar menú
            hideModal(dishModal);
            loadMenu();
            
        } catch (error) {
            console.error('Error al guardar plato:', error);
            showAlert(
                document.getElementById('dish-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Error al guardar plato: ${error.response?.data || error.message}`
            );
        }
    }
    
    function viewDish(dishId) {
        // En una aplicación real, aquí cargaríamos los detalles completos
        editDish(dishId);
    }
    
    function editDish(dishId) {
        showDishModal(dishId);
    }
    
    function deleteDish(dishId) {
        document.getElementById('delete-id').value = dishId;
        document.getElementById('delete-type').value = 'dish';
        document.getElementById('delete-message').textContent = '¿Está seguro de que desea eliminar este plato? Esta acción no se puede deshacer.';
        
        showModal(deleteModal);
    }
    
    // Funciones para modal de pedido
    async function showOrderModal(orderId = null) {
        document.getElementById('order-form').reset();
        document.getElementById('order-id').value = '';
        document.getElementById('order-modal-title').textContent = 'Nuevo Pedido';
        document.getElementById('order-items').innerHTML = '';
        
        // Cargar clientes para el select
        await loadClientSelect();
        
        if (orderId) {
            document.getElementById('order-modal-title').textContent = 'Editar Pedido';
            document.getElementById('order-id').value = orderId;
            
            // Cargar datos del pedido
            await loadOrderData(orderId);
        } else {
            // Añadir un elemento de pedido vacío
            addOrderItem();
        }
        
        showModal(orderModal);
    }
    
    async function loadClientSelect() {
        try {
            const response = await axios.get(`${API_BASE_URL}/clients`, {
                headers: {  }
            });
            
            const clients = response.data;
            const select = document.getElementById('order-customer');
            
            select.innerHTML = '<option value="">Seleccionar cliente</option>';
            clients.forEach(client => {
                select.innerHTML += `<option value="${client.idClient}">${client.firstName} ${client.lastName}</option>`;
            });
            
        } catch (error) {
            console.error('Error al cargar clientes:', error);
            showAlert(
                document.getElementById('order-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Error al cargar clientes: ${error.message}`
            );
        }
    }
    
    async function loadOrderData(orderId) {
        try {
            // Cargar pedido
            const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`, {
                headers: {  }
            });
            
            const order = response.data;
            
            document.getElementById('order-customer').value = order.idCustomer || '';
            document.getElementById('order-status').value = order.status || 'Pendiente';
            
            // Cargar detalles del pedido
            const detailsResponse = await axios.get(`${API_BASE_URL}/order-details/order/${orderId}`, {
                headers: {  }
            });
            
            const details = detailsResponse.data;
            
            // Limpiar contenedor de ítems
            document.getElementById('order-items').innerHTML = '';
            
            // Añadir ítems
            details.forEach(detail => {
                addOrderItem(detail);
            });
            
            // Calcular total
            calculateOrderTotal();
            
        } catch (error) {
            console.error('Error al cargar datos del pedido:', error);
            showAlert(
                document.getElementById('order-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Error al cargar datos del pedido: ${error.message}`
            );
        }
    }
    
    async function addOrderItem(detail = null) {
        // Cargar platos para el select
        try {
            const response = await axios.get(`${API_BASE_URL}/menu`, {
                headers: {  }
            });
            
            const dishes = response.data;
            const itemId = Date.now(); // ID único para el ítem
            
            const itemHtml = `
                <div class="card mb-2 order-item-card" id="order-item-${itemId}">
                    <div class="card-body">
                        <div class="d-flex justify-between align-center">
                            <div class="form-group mb-0" style="flex-grow: 1;">
                                <select class="form-control order-item-dish" data-item-id="${itemId}" onchange="updateItemPrice(${itemId})">
                                    <option value="">Seleccionar plato</option>
                                    ${dishes.map(dish => `
                                        <option value="${dish.idDish}" data-price="${dish.price}"
                                            ${detail && detail.idDish === dish.idDish ? 'selected' : ''}>
                                            ${dish.name} - $${dish.price.toFixed(2)}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="form-group mx-2" style="width: 80px;">
                                <input type="number" class="form-control order-item-quantity" data-item-id="${itemId}" 
                                    min="1" value="${detail ? detail.quantity : 1}" onchange="updateItemTotal(${itemId})">
                            </div>
                            <div class="form-group mx-2" style="width: 100px;">
                                <input type="text" class="form-control order-item-total" data-item-id="${itemId}" 
                                    value="$${detail ? (detail.price * detail.quantity).toFixed(2) : '0.00'}" readonly>
                            </div>
                            <button type="button" class="btn btn-danger btn-icon" onclick="removeOrderItem(${itemId})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.getElementById('order-items').insertAdjacentHTML('beforeend', itemHtml);
            
            // Si hay un detalle, establecer valores
            if (detail) {
                document.querySelector(`.order-item-dish[data-item-id="${itemId}"]`).value = detail.idDish;
                updateItemPrice(itemId);
            }
            
            calculateOrderTotal();
            
        } catch (error) {
            console.error('Error al cargar platos:', error);
            showAlert(
                document.getElementById('order-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Error al cargar platos: ${error.message}`
            );
        }
    }
    
    function updateItemPrice(itemId) {
        const select = document.querySelector(`.order-item-dish[data-item-id="${itemId}"]`);
        const option = select.options[select.selectedIndex];
        
        if (option && option.dataset.price) {
            const price = parseFloat(option.dataset.price);
            const quantity = parseInt(document.querySelector(`.order-item-quantity[data-item-id="${itemId}"]`).value) || 1;
            
            document.querySelector(`.order-item-total[data-item-id="${itemId}"]`).value = `$${(price * quantity).toFixed(2)}`;
            
            calculateOrderTotal();
        }
    }
    
    function updateItemTotal(itemId) {
        const select = document.querySelector(`.order-item-dish[data-item-id="${itemId}"]`);
        
        if (select.value) {
            updateItemPrice(itemId);
        }
    }
    
    function removeOrderItem(itemId) {
        const item = document.getElementById(`order-item-${itemId}`);
        if (item) {
            item.remove();
            calculateOrderTotal();
        }
    }
    
    function calculateOrderTotal() {
        let total = 0;
        
        document.querySelectorAll('.order-item-total').forEach(input => {
            const value = input.value.replace('$', '');
            total += parseFloat(value) || 0;
        });
        
        document.getElementById('order-total').textContent = total.toFixed(2);
    }
    
    async function saveOrder() {
        const orderId = document.getElementById('order-id').value;
        const customerId = document.getElementById('order-customer').value;
        const status = document.getElementById('order-status').value;
        
        if (!customerId) {
            showAlert(
                document.getElementById('order-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Por favor, seleccione un cliente.`
            );
            return;
        }
        
        // Recopilar ítems
        const items = [];
        let hasItems = false;
        
        document.querySelectorAll('.order-item-card').forEach(card => {
            const itemId = card.id.replace('order-item-', '');
            const dishSelect = document.querySelector(`.order-item-dish[data-item-id="${itemId}"]`);
            const dishId = dishSelect.value;
            
            if (dishId) {
                hasItems = true;
                const quantity = parseInt(document.querySelector(`.order-item-quantity[data-item-id="${itemId}"]`).value) || 1;
                const option = dishSelect.options[dishSelect.selectedIndex];
                const price = parseFloat(option.dataset.price) || 0;
                
                items.push({
                    idDish: parseInt(dishId),
                    quantity: quantity,
                    price: price
                });
            }
        });
        
        if (!hasItems) {
            showAlert(
                document.getElementById('order-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Por favor, agregue al menos un plato al pedido.`
            );
            return;
        }
        
        try {
            let orderId;
            
            if (document.getElementById('order-id').value) {
                // Actualizar pedido existente
                const orderData = {
                    idOrder: parseInt(document.getElementById('order-id').value),
                    idCustomer: parseInt(customerId),
                    status: status,
                    date: new Date().toISOString()
                };
                
                await axios.put(`${API_BASE_URL}/orders/${orderData.idOrder}`, orderData, {
                    headers: {  }
                });
                
                orderId = orderData.idOrder;
                
                // Eliminar detalles anteriores
                const detailsResponse = await axios.get(`${API_BASE_URL}/order-details/order/${orderId}`, {
                    headers: {  }
                });
                
                for (const detail of detailsResponse.data) {
                    await axios.delete(`${API_BASE_URL}/order-details/${detail.idDetail}`, {
                        headers: {  }
                    });
                }
                
                showAlert(
                    ordersAlert,
                    `<i class="fas fa-check-circle"></i> Pedido actualizado correctamente.`,
                    'success'
                );
            } else {
                // Crear nuevo pedido
                const orderData = {
                    idCustomer: parseInt(customerId),
                    status: status,
                    date: new Date().toISOString()
                };
                
                const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
                    headers: {  }
                });
                
                orderId = response.data.idOrder;
                
                showAlert(
                    ordersAlert,
                    `<i class="fas fa-check-circle"></i> Pedido creado correctamente.`,
                    'success'
                );
            }
            
            // Crear detalles
            for (const item of items) {
                const detailData = {
                    idOrder: orderId,
                    idDish: item.idDish,
                    quantity: item.quantity,
                    price: item.price
                };
                
                await axios.post(`${API_BASE_URL}/order-details`, detailData, {
                    headers: {  }
                });
            }
            
            // Cerrar modal y recargar pedidos
            hideModal(orderModal);
            loadOrders();
            
        } catch (error) {
            console.error('Error al guardar pedido:', error);
            showAlert(
                document.getElementById('order-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Error al guardar pedido: ${error.response?.data || error.message}`
            );
        }
    }
    
    function viewOrder(orderId) {
        // En una aplicación real, aquí cargaríamos los detalles completos
        editOrder(orderId);
    }
    
    function editOrder(orderId) {
        showOrderModal(orderId);
    }
    
    function deleteOrder(orderId) {
        document.getElementById('delete-id').value = orderId;
        document.getElementById('delete-type').value = 'order';
        document.getElementById('delete-message').textContent = '¿Está seguro de que desea eliminar este pedido? Esta acción no se puede deshacer.';
        
        showModal(deleteModal);
    }
    
    function updateOrderStatus(orderId, currentStatus) {
        // Aquí iría la lógica para actualizar el estado del pedido
        alert(`Actualizar estado del pedido ${orderId}. Estado actual: ${currentStatus}`);
    }
    
    // Funciones para modal de empleado
    function showEmployeeModal(employeeId = null) {
        document.getElementById('employee-form').reset();
        document.getElementById('employee-id').value = '';
        document.getElementById('employee-modal-title').textContent = 'Nuevo Empleado';
        
        if (employeeId) {
            document.getElementById('employee-modal-title').textContent = 'Editar Empleado';
            document.getElementById('employee-id').value = employeeId;
            
            // Cargar datos del empleado
            loadEmployeeData(employeeId);
        }
        
        showModal(employeeModal);
    }
    
    async function loadEmployeeData(employeeId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/employees/${employeeId}`, {
                headers: {  }
            });
            
            const employee = response.data;
            
            document.getElementById('employee-firstname').value = employee.firstName || '';
            document.getElementById('employee-lastname').value = employee.lastName || '';
            document.getElementById('employee-position').value = employee.position || '';
            document.getElementById('employee-salary').value = employee.salary || 0;
            
        } catch (error) {
            console.error('Error al cargar datos del empleado:', error);
            showAlert(
                document.getElementById('employee-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Error al cargar datos del empleado: ${error.message}`
            );
        }
    }
    
    async function saveEmployee() {
        const employeeId = document.getElementById('employee-id').value;
        const firstName = document.getElementById('employee-firstname').value;
        const lastName = document.getElementById('employee-lastname').value;
        const position = document.getElementById('employee-position').value;
        const salary = document.getElementById('employee-salary').value;
        
        const employeeData = {
            firstName,
            lastName,
            position,
            salary: parseFloat(salary)
        };
        
        try {
            if (employeeId) {
                // Actualizar empleado existente
                employeeData.idEmployee = parseInt(employeeId);
                await axios.put(`${API_BASE_URL}/employees/${employeeId}`, employeeData, {
                    headers: {  }
                });
                
                showAlert(
                    staffAlert,
                    `<i class="fas fa-check-circle"></i> Empleado actualizado correctamente.`,
                    'success'
                );
            } else {
                // Crear nuevo empleado
                await axios.post(`${API_BASE_URL}/employees`, employeeData, {
                    headers: {  }
                });
                
                showAlert(
                    staffAlert,
                    `<i class="fas fa-check-circle"></i> Empleado creado correctamente.`,
                    'success'
                );
            }
            
            // Cerrar modal y recargar empleados
            hideModal(employeeModal);
            loadStaff();
            
        } catch (error) {
            console.error('Error al guardar empleado:', error);
            showAlert(
                document.getElementById('employee-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Error al guardar empleado: ${error.response?.data || error.message}`
            );
        }
    }
    
    function viewEmployee(employeeId) {
        // En una aplicación real, aquí cargaríamos los detalles completos
        editEmployee(employeeId);
    }
    
    function editEmployee(employeeId) {
        showEmployeeModal(employeeId);
    }
    
    function deleteEmployee(employeeId) {
        document.getElementById('delete-id').value = employeeId;
        document.getElementById('delete-type').value = 'employee';
        document.getElementById('delete-message').textContent = '¿Está seguro de que desea eliminar este empleado? Esta acción no se puede deshacer.';
        
        showModal(deleteModal);
    }
    
    // Función para confirmar eliminación
    async function confirmDelete() {
        const id = document.getElementById('delete-id').value;
        const type = document.getElementById('delete-type').value;
        
        if (!id || !type) {
            hideModal(deleteModal);
            return;
        }
        
        try {
            let url = '';
            let message = '';
            let alertElement = null;
            
            switch (type) {
                case 'client':
                    url = `${API_BASE_URL}/clients/${id}`;
                    message = 'Cliente eliminado correctamente.';
                    alertElement = clientsAlert;
                    break;
                case 'dish':
                    url = `${API_BASE_URL}/menu/${id}`;
                    message = 'Plato eliminado correctamente.';
                    alertElement = menuAlert;
                    break;
                case 'order':
                    url = `${API_BASE_URL}/orders/${id}`;
                    message = 'Pedido eliminado correctamente.';
                    alertElement = ordersAlert;
                    break;
                case 'employee':
                    url = `${API_BASE_URL}/employees/${id}`;
                    message = 'Empleado eliminado correctamente.';
                    alertElement = staffAlert;
                    break;
            }
            
            if (url) {
                await axios.delete(url, {
                    headers: {  }
                });
                
                showAlert(
                    alertElement,
                    `<i class="fas fa-check-circle"></i> ${message}`,
                    'success'
                );
                
                // Recargar datos
                switch (type) {
                    case 'client':
                        loadClients();
                        break;
                    case 'dish':
                        loadMenu();
                        break;
                    case 'order':
                        loadOrders();
                        break;
                    case 'employee':
                        loadStaff();
                        break;
                }
            }
            
            hideModal(deleteModal);
            
        } catch (error) {
            console.error('Error al eliminar:', error);
            showAlert(
                document.getElementById('delete-modal-alert'),
                `<i class="fas fa-exclamation-circle"></i> Error al eliminar: ${error.response?.data || error.message}`
            );
        }
    }
    
    // Utilidades
    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) return 'Fecha inválida';
        
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    function getStatusBadgeColor(status) {
        switch (status) {
            case 'Pendiente':
                return 'warning';
            case 'En Preparación':
                return 'info';
            case 'Listo':
                return 'success';
            case 'Entregado':
                return 'primary';
            case 'Cancelado':
                return 'danger';
            default:
    return 'light';
    }
}

// Exponer funciones para usar en atributos onclick del HTML
window.viewClient = viewClient;
window.editClient = editClient;
window.deleteClient = deleteClient;
window.viewDish = viewDish;
window.editDish = editDish;
window.deleteDish = deleteDish;
window.viewOrder = viewOrder;
window.editOrder = editOrder;
window.deleteOrder = deleteOrder;
window.updateOrderStatus = updateOrderStatus;
window.viewEmployee = viewEmployee;
window.editEmployee = editEmployee;
window.deleteEmployee = deleteEmployee;
window.showClientModal = showClientModal;
window.showDishModal = showDishModal;
window.showOrderModal = showOrderModal;
window.showEmployeeModal = showEmployeeModal;
window.addOrderItem = addOrderItem;
window.updateItemPrice = updateItemPrice;
window.updateItemTotal = updateItemTotal;
window.removeOrderItem = removeOrderItem;

// Configurar Axios para interceptar errores de autenticación
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token inválido o expirado
            alert('Tu sesión ha expirado o no tienes permisos para esta acción. Por favor, inicia sesión de nuevo.');
            logout();
        }
        return Promise.reject(error);
    }
);



// Función para inicializar la demostración con datos de ejemplo
// Esta función solo sería útil en un entorno de demostración
async function initDemoData() {
    if (!localStorage.getItem('demoInitialized')) {
        try {
            // Asegurarse de que el usuario ha iniciado sesión
            if (!currentToken) return;
            
            // Crear algunos clientes de ejemplo
            const clientsData = [
                { firstName: 'Juan', lastName: 'Pérez', phone: '555-123-4567', email: 'juan.perez@example.com' },
                { firstName: 'María', lastName: 'González', phone: '555-987-6543', email: 'maria.gonzalez@example.com' },
                { firstName: 'Carlos', lastName: 'Rodríguez', phone: '555-456-7890', email: 'carlos.rodriguez@example.com' }
            ];
            
            for (const client of clientsData) {
                await axios.post(`${API_BASE_URL}/clients`, client, {
                    headers: {  }
                });
            }
            
            // Crear algunos platos de ejemplo
            const dishesData = [
                { name: 'Pad Thai', description: 'Fideos de arroz salteados con gambas, huevo, brotes de soja y cacahuetes', price: 12.95 },
                { name: 'Curry Massaman', description: 'Curry tailandés con patatas, cacahuetes y especias aromáticas', price: 14.50 },
                { name: 'Sushi Variado', description: 'Selección de nigiri y maki de salmón, atún y langostino', price: 18.75 },
                { name: 'Pollo Tikka Masala', description: 'Pollo marinado en especias y yogur, cocinado en salsa cremosa de tomate', price: 13.25 },
                { name: 'Tacos al Pastor', description: 'Tacos de cerdo marinado con piña, cilantro y cebolla', price: 10.50 }
            ];
            
            for (const dish of dishesData) {
                await axios.post(`${API_BASE_URL}/menu`, dish, {
                    headers: {  }
                });
            }
            
            // Crear algunos empleados de ejemplo
            const employeesData = [
                { firstName: 'Laura', lastName: 'Martínez', position: 'Chef', salary: 2500.00 },
                { firstName: 'Roberto', lastName: 'Sánchez', position: 'Camarero', salary: 1800.00 },
                { firstName: 'Elena', lastName: 'Díaz', position: 'Gerente', salary: 2800.00 }
            ];
            
            for (const employee of employeesData) {
                await axios.post(`${API_BASE_URL}/employees`, employee, {
                    headers: {  }
                });
            }
            
            // Marcar como inicializado
            localStorage.setItem('demoInitialized', 'true');
            
            console.log('Datos de demostración inicializados correctamente');
            
        } catch (error) {
            console.error('Error al inicializar datos de demostración:', error);
        }
    }
}

// Función para búsqueda en tiempo real
function setupSearch() {
    const clientSearch = document.getElementById('client-search');
    const dishSearch = document.getElementById('dish-search');
    const orderSearch = document.getElementById('order-search');
    const employeeSearch = document.getElementById('employee-search');
    
    // Debounce function
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    // Búsqueda de clientes
    if (clientSearch) {
        clientSearch.addEventListener('input', debounce(async (e) => {
            const searchTerm = e.target.value.trim();
            
            try {
                let url = `${API_BASE_URL}/clients`;
                if (searchTerm) {
                    url = `${API_BASE_URL}/clients/search?term=${encodeURIComponent(searchTerm)}`;
                }
                
                const response = await axios.get(url, {
                    headers: {  }
                });
                
                updateClientsUI(response.data);
                
            } catch (error) {
                console.error('Error en la búsqueda de clientes:', error);
            }
        }, 300));
    }
    
    // Búsqueda de platos
    if (dishSearch) {
        dishSearch.addEventListener('input', debounce(async (e) => {
            const searchTerm = e.target.value.trim();
            
            try {
                let url = `${API_BASE_URL}/menu`;
                if (searchTerm) {
                    url = `${API_BASE_URL}/menu/search?term=${encodeURIComponent(searchTerm)}`;
                }
                
                const response = await axios.get(url, {
                    headers: {  }
                });
                
                updateDishesUI(response.data);
                
            } catch (error) {
                console.error('Error en la búsqueda de platos:', error);
            }
        }, 300));
    }
    
    // Similar para pedidos y empleados
}

// Funciones auxiliares para actualizar UI después de búsquedas
function updateClientsUI(clients) {
    if (!clients.length) {
        clientsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fas fa-search"></i></div>
                <h3 class="empty-title">No se encontraron resultados</h3>
                <p class="empty-description">Intente con otra búsqueda o agregue un nuevo cliente.</p>
                <button class="btn btn-primary" onclick="showClientModal()">
                    <i class="fas fa-user-plus"></i> Agregar Cliente
                </button>
            </div>
        `;
        return;
    }
    
    clientsContainer.innerHTML = clients.map(client => `
        <div class="person-card">
            <div class="person-avatar">
                ${getInitials(client.firstName || '', client.lastName || '')}
            </div>
            <div class="person-info">
                <h3 class="person-name">${client.firstName} ${client.lastName}</h3>
                <div class="person-details">
                    <div class="person-detail">
                        <i class="fas fa-envelope"></i> ${client.email || 'No disponible'}
                    </div>
                    <div class="person-detail">
                        <i class="fas fa-phone"></i> ${client.phone || 'No disponible'}
                    </div>
                </div>
            </div>
            <div class="person-actions">
                <button class="btn btn-info btn-icon" onclick="viewClient(${client.idClient})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-primary btn-icon" onclick="editClient(${client.idClient})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-icon" onclick="deleteClient(${client.idClient})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function updateDishesUI(dishes) {
    if (!dishes.length) {
        dishesContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fas fa-search"></i></div>
                <h3 class="empty-title">No se encontraron resultados</h3>
                <p class="empty-description">Intente con otra búsqueda o agregue un nuevo plato.</p>
                <button class="btn btn-primary" onclick="showDishModal()">
                    <i class="fas fa-plus"></i> Agregar Plato
                </button>
            </div>
        `;
        return;
    }
    
    dishesContainer.innerHTML = dishes.map(dish => `
        <div class="menu-item">
            <div class="menu-item-image">
                <i class="fas fa-utensils"></i>
            </div>
            <div class="menu-item-content">
                <h3 class="menu-item-title">${dish.name}</h3>
                <p class="menu-item-description">${dish.description || 'Sin descripción'}</p>
            </div>
            <div class="menu-item-price">
                <div>$${dish.price.toFixed(2)}</div>
                <div class="person-actions mt-2">
                    <button class="btn btn-info btn-icon" onclick="viewDish(${dish.idDish})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-primary btn-icon" onclick="editDish(${dish.idDish})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-icon" onclick="deleteDish(${dish.idDish})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Funciones de filtrado
function setupFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    
    filterOptions.forEach(option => {
        option.addEventListener('click', async () => {
            const filterGroup = option.parentElement;
            const filterType = option.getAttribute('data-filter');
            
            // Actualizar clase activa
            filterGroup.querySelectorAll('.filter-option').forEach(opt => {
                opt.classList.remove('active');
            });
            option.classList.add('active');
            
            // Aplicar filtros según la sección actual
            const section = getCurrentSection();
            
            switch (section) {
                case 'clients':
                    await filterClients(filterType);
                    break;
                case 'menu':
                    await filterDishes(filterType);
                    break;
                case 'orders':
                    await filterOrders(filterType);
                    break;
                case 'staff':
                    await filterEmployees(filterType);
                    break;
            }
        });
    });
}

function getCurrentSection() {
    const activeLink = document.querySelector('.nav-link.active');
    return activeLink ? activeLink.getAttribute('data-section') : 'dashboard';
}

async function filterClients(filterType) {
    try {
        const response = await axios.get(`${API_BASE_URL}/clients`, {
            headers: {  }
        });
        
        let clients = response.data;
        
        // Aplicar filtro
        switch (filterType) {
            case 'recent':
                // Ordenar por ID descendente (asumiendo que IDs más altos son más recientes)
                clients.sort((a, b) => b.idClient - a.idClient);
                break;
            case 'alphabetical':
                // Ordenar alfabéticamente por nombre
                clients.sort((a, b) => {
                    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
                    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
                    return nameA.localeCompare(nameB);
                });
                break;
            // 'all' no requiere filtrado
        }
        
        updateClientsUI(clients);
        
    } catch (error) {
        console.error('Error al filtrar clientes:', error);
    }
}

async function filterDishes(filterType) {
    try {
        const response = await axios.get(`${API_BASE_URL}/menu`, {
            headers: {  }
        });
        
        let dishes = response.data;
        
        // Aplicar filtro
        switch (filterType) {
            case 'price-asc':
                dishes.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                dishes.sort((a, b) => b.price - a.price);
                break;
            // 'all' no requiere filtrado
        }
        
        updateDishesUI(dishes);
        
    } catch (error) {
        console.error('Error al filtrar platos:', error);
    }
}

async function filterOrders(filterType) {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders`, {
            headers: {  }
        });
        
        let orders = response.data;
        
        // Aplicar filtro
        switch (filterType) {
            case 'pending':
                orders = orders.filter(order => order.status === 'Pendiente');
                break;
            case 'completed':
                orders = orders.filter(order => order.status === 'Entregado' || order.status === 'Listo');
                break;
            case 'canceled':
                orders = orders.filter(order => order.status === 'Cancelado');
                break;
            // 'all' no requiere filtrado
        }
        
        // La función updateOrdersUI no está implementada en este ejemplo
        // pero sería similar a las otras funciones de actualización de UI
        loadOrders(); // En este caso, recargamos todos los pedidos en su lugar
        
    } catch (error) {
        console.error('Error al filtrar pedidos:', error);
    }
}

async function filterEmployees(filterType) {
    try {
        const response = await axios.get(`${API_BASE_URL}/employees`, {
            headers: {  }
        });
        
        let employees = response.data;
        
        // Aplicar filtro
        switch (filterType) {
            case 'position':
                employees.sort((a, b) => {
                    const posA = a.position ? a.position.toLowerCase() : '';
                    const posB = b.position ? b.position.toLowerCase() : '';
                    return posA.localeCompare(posB);
                });
                break;
            case 'salary-asc':
                employees.sort((a, b) => a.salary - b.salary);
                break;
            case 'salary-desc':
                employees.sort((a, b) => b.salary - a.salary);
                break;
            // 'all' no requiere filtrado
        }
        
        // La función updateEmployeesUI no está implementada en este ejemplo
        loadStaff(); // En este caso, recargamos todos los empleados en su lugar
        
    } catch (error) {
        console.error('Error al filtrar empleados:', error);
    }
}

// Inicialización adicional
function setupExtraEventListeners() {
    // Formulario de perfil
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const userData = {
                firstName: document.getElementById('profile-firstname').value,
                lastName: document.getElementById('profile-lastname').value,
                email: document.getElementById('profile-email').value,
                phone: document.getElementById('profile-phone').value,
                position: document.getElementById('profile-position').value
            };
            
            try {
                await axios.put(`${API_BASE_URL}/auth/user/${currentUser.id}`, userData, {
                    headers: {  }
                });
                
                showAlert(
                    profileAlert,
                    `<i class="fas fa-check-circle"></i> Perfil actualizado correctamente.`,
                    'success'
                );
                
                // Actualizar datos del usuario actual
                currentUser = { ...currentUser, ...userData };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                updateUserUI();
                
            } catch (error) {
                console.error('Error al actualizar perfil:', error);
                showAlert(
                    profileAlert,
                    `<i class="fas fa-exclamation-circle"></i> Error al actualizar perfil: ${error.response?.data || error.message}`
                );
            }
        });
    }
    
    // Formulario de cambio de contraseña
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (newPassword !== confirmPassword) {
                showAlert(
                    profileAlert,
                    `<i class="fas fa-exclamation-circle"></i> Las contraseñas no coinciden.`
                );
                return;
            }
            
            try {
                await axios.put(`${API_BASE_URL}/auth/password`, {
                    currentPassword,
                    newPassword
                }, {
                    headers: {  }
                });
                
                showAlert(
                    profileAlert,
                    `<i class="fas fa-check-circle"></i> Contraseña actualizada correctamente.`,
                    'success'
                );
                
                passwordForm.reset();
                
            } catch (error) {
                console.error('Error al cambiar contraseña:', error);
                showAlert(
                    profileAlert,
                    `<i class="fas fa-exclamation-circle"></i> Error al cambiar contraseña: ${error.response?.data || error.message}`
                );
            }
        });
    }
}

// Inicializar funcionalidades adicionales
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    setupFilters();
    setupExtraEventListeners();
    
    // Inicializar datos de demostración si es necesario
    // Solo para entornos de prueba/demo
    // initDemoData();
});