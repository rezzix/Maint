CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    domain VARCHAR(255),
    logo_url VARCHAR(512),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    tier VARCHAR(50) NOT NULL DEFAULT 'standard',
    max_users INT NOT NULL DEFAULT 10,
    max_assets INT NOT NULL DEFAULT 50,
    settings JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tenant_configs (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    timezone VARCHAR(100) NOT NULL DEFAULT 'UTC',
    date_format VARCHAR(50) DEFAULT 'YYYY-MM-DD',
    currency VARCHAR(10) DEFAULT 'USD',
    language VARCHAR(10) DEFAULT 'en',
    allow_self_registration BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tenant_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    plan_code VARCHAR(100) NOT NULL,
    start_date DATE,
    end_date DATE,
    billing_cycle VARCHAR(50),
    amount DECIMAL(12,2),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255),
    module VARCHAR(100),
    action VARCHAR(50)
);

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id),
    permission_id UUID NOT NULL REFERENCES permissions(id),
    tenant_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id),
    role_id UUID NOT NULL REFERENCES roles(id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE sites (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) UNIQUE NOT NULL,
    address_line1 VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE buildings (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    site_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100),
    total_floors INT DEFAULT 1,
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE asset_categories (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    parent_id UUID,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100),
    description TEXT,
    schema_definition JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    category_id UUID,
    site_id UUID,
    building_id UUID,
    name VARCHAR(255) NOT NULL,
    asset_tag VARCHAR(255) UNIQUE NOT NULL,
    serial_number VARCHAR(255),
    manufacturer VARCHAR(255),
    model VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'operational',
    criticality VARCHAR(50) NOT NULL DEFAULT 'medium',
    purchase_cost DECIMAL(12,2),
    warranty_expiry DATE,
    custom_attributes JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE work_orders (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    asset_id UUID,
    site_id UUID,
    pm_plan_id UUID,
    wo_number VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL DEFAULT 'corrective',
    priority VARCHAR(50) NOT NULL DEFAULT 'medium',
    status VARCHAR(50) NOT NULL DEFAULT 'open',
    target_date DATE,
    estimated_hours DECIMAL(8,2),
    actual_hours DECIMAL(8,2),
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE work_order_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    work_order_id UUID NOT NULL,
    sequence INT,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    estimated_hours DECIMAL(8,2),
    actual_hours DECIMAL(8,2),
    completed_at TIMESTAMP
);

CREATE TABLE pm_plans (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    asset_id UUID,
    site_id UUID,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) NOT NULL DEFAULT 'medium',
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    requires_shutdown BOOLEAN DEFAULT FALSE,
    estimated_duration_minutes INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pm_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    pm_plan_id UUID NOT NULL,
    trigger_type VARCHAR(50) NOT NULL DEFAULT 'time',
    interval_value INT,
    interval_unit VARCHAR(20),
    start_date DATE,
    end_date DATE,
    lead_days INT,
    day_of_week VARCHAR(20),
    day_of_month INT
);

CREATE TABLE parts (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    part_number VARCHAR(255) UNIQUE NOT NULL,
    unit_of_measure VARCHAR(20) DEFAULT 'each',
    unit_cost DECIMAL(12,2),
    category VARCHAR(100),
    manufacturer VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    consumable BOOLEAN DEFAULT FALSE,
    specifications JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE stock_levels (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    part_id UUID NOT NULL,
    warehouse_id UUID,
    quantity_on_hand INT DEFAULT 0,
    quantity_reserved INT DEFAULT 0,
    reorder_point INT DEFAULT 0,
    reorder_quantity INT DEFAULT 0,
    bin_location VARCHAR(100),
    last_counted_at TIMESTAMP
);

CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    vendor_id UUID,
    po_number VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    order_date DATE,
    expected_delivery_date DATE,
    subtotal DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE po_items (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    po_id UUID NOT NULL,
    part_id UUID,
    line_number INT,
    description TEXT,
    quantity_ordered INT,
    quantity_received INT,
    unit_price DECIMAL(12,2),
    line_total DECIMAL(12,2)
);

CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) UNIQUE NOT NULL,
    tax_id VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    category VARCHAR(100),
    payment_terms_days INT,
    currency VARCHAR(10),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE technicians (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL,
    employee_code VARCHAR(100),
    job_title VARCHAR(255),
    department VARCHAR(255),
    hourly_rate DECIMAL(10,2),
    shift VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'available',
    phone VARCHAR(50),
    skills JSONB,
    hire_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_ossp.uuid_generate_v4(),
    tenant_id VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    action VARCHAR(255),
    performed_by VARCHAR(255),
    previous_state JSONB,
    new_state JSONB,
    source_ip VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tenant_id ON assets(tenant_id);
CREATE INDEX idx_tenant_id ON work_orders(tenant_id);
CREATE INDEX idx_tenant_id ON parts(tenant_id);
CREATE INDEX idx_tenant_id ON tenants(id);
CREATE INDEX idx_wo_status ON work_orders(status);
CREATE INDEX idx_asset_status ON assets(status);
