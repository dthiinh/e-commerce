import pymysql
from app.core.config import settings
from app.db.database import Base, engine
from app.models import user, category, product, order

def create_database():
    # Tạo kết nối đến MySQL server (không cần chọn database)
    conn = pymysql.connect(
        host=settings.MYSQL_SERVER,
        user=settings.MYSQL_USER,
        password=settings.MYSQL_PASSWORD,
        port=int(settings.MYSQL_PORT)
    )
    
    try:
        with conn.cursor() as cursor:
            # Tạo database nếu chưa tồn tại
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {settings.MYSQL_DB}")
            print(f"Database '{settings.MYSQL_DB}' đã được tạo hoặc đã tồn tại.")
    except Exception as e:
        print(f"Lỗi khi tạo database: {e}")
    finally:
        conn.close()
    
    try:
        # Tạo tất cả các bảng từ các models
        Base.metadata.create_all(bind=engine)
        print("Các bảng đã được tạo thành công.")
    except Exception as e:
        print(f"Lỗi khi tạo bảng: {e}")

if __name__ == "__main__":
    create_database() 