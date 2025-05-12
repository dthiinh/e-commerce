import pymysql
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.db.database import Base
from app.models import user, category, product, order
from app.models.user import User
from app.core.security import get_password_hash

def recreate_database():
    # Kết nối đến MySQL
    conn = pymysql.connect(
        host=settings.MYSQL_SERVER,
        user=settings.MYSQL_USER,
        password=settings.MYSQL_PASSWORD,
        port=int(settings.MYSQL_PORT)
    )
    
    try:
        with conn.cursor() as cursor:
            # Xóa database nếu tồn tại
            cursor.execute(f"DROP DATABASE IF EXISTS {settings.MYSQL_DB}")
            print(f"Database '{settings.MYSQL_DB}' đã được xóa.")
            
            # Tạo database mới
            cursor.execute(f"CREATE DATABASE {settings.MYSQL_DB}")
            print(f"Database '{settings.MYSQL_DB}' đã được tạo mới.")
    except Exception as e:
        print(f"Lỗi khi xử lý database: {e}")
    finally:
        conn.close()
    
    # Tạo engine và kết nối đến database mới
    engine = create_engine(settings.DATABASE_URL)
    
    try:
        # Tạo tất cả các bảng từ các models
        Base.metadata.create_all(bind=engine)
        print("Các bảng đã được tạo thành công.")
        
        # Tạo session để thêm dữ liệu
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        db = SessionLocal()
        
        # Tạo tài khoản admin
        admin_info = {
            "username": "admin",
            "email": "admin@example.com",
            "full_name": "Admin User",
            "password": "admin123",  # Mật khẩu ban đầu
            "is_active": True,
            "is_admin": True
        }
        
        # Kiểm tra xem admin đã tồn tại chưa
        admin = db.query(User).filter(User.username == admin_info["username"]).first()
        
        if not admin:
            # Tạo hash password
            hashed_password = get_password_hash(admin_info["password"])
            
            # Tạo user admin
            new_admin = User(
                username=admin_info["username"],
                email=admin_info["email"],
                full_name=admin_info["full_name"],
                hashed_password=hashed_password,
                is_active=admin_info["is_active"],
                is_admin=admin_info["is_admin"]
            )
            
            # Thêm vào database
            db.add(new_admin)
            db.commit()
            
            print("Tài khoản admin đã được tạo thành công!")
            print(f"Username: {admin_info['username']}")
            print(f"Password: {admin_info['password']}")
            print(f"Email: {admin_info['email']}")
        
    except Exception as e:
        print(f"Lỗi: {e}")

if __name__ == "__main__":
    recreate_database() 