# 1. 베이스 이미지: JDK 17 버전으로 변경
FROM openjdk:17-jdk-slim

# 2. 빌드된 JAR 파일 복사
# build/libs/ 폴더에 있는 실제 JAR 파일 이름과 일치하는지 확인하세요.
COPY build/libs/hackathon-0.0.1-SNAPSHOT.jar app.jar

# 3. 포트 노출 (스프링 부트 기본 포트)
EXPOSE 8080

# 4. 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "/app.jar"]