from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.user import User
from app.core.security import get_password_hash
from app.core.config import settings

def create_admin_user():
    # Tạo kết nối đến database
    engine = create_engine(settings.DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        # Kiểm tra xem tài khoản admin đã tồn tại chưa
        admin = db.query(User).filter(User.username == "admin").first()
        
        if admin:
            print("Tài khoản admin đã tồn tại!")
            print(f"Username: admin")
            print(f"Email: {admin.email}")
            return
        
        # Thông tin admin mặc định
        admin_info = {
            "username": "admin",
            "email": "admin@example.com",
            "full_name": "Admin User",
            "password": "admin123",  # Mật khẩu ban đầu
            "is_active": True,
            "is_admin": True
        }
        
        # Tạo hash password
        hashed_password = get_password_hash(admin_info["password"])
        
        # Tạo user admin mới
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
    finally:
        db.close()

if __name__ == "__main__":
    create_admin_user() 