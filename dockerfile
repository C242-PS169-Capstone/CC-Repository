# Gunakan image dasar Node.js
FROM node:18

# Atur direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Expose port yang digunakan aplikasi (sesuaikan dengan port API Anda)
EXPOSE 8080

# Jalankan aplikasi
CMD ["npm", "start"]
