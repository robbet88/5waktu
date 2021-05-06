$("#cari").hide()
let aft = null
let x = null;
$("#btnC").on("click",() => {
  $("#cari").toggle()
})

$(document).ready(() => {
  jam()
  filter(search.value,jam())
})

//fungsi jam
function jam() {
  let w = new Date();
  let jam = w.getHours();
  let min = w.getMinutes();
  let sec = w.getSeconds();
  let tgl = `${w.getFullYear()}-${w.getMonth()+1}-${w.getDate()}`
  if (jam >= 4 && jam <= 9 ) {
    
    say.innerHTML ='GoodMorning<i id="logo" class="fa fa-sun">'
  }else if (jam > 9 && jam <= 18) {
    say.innerHTML ='GoodAfternoon<i id="logo" class="fa fa-sun">'
  }else if (jam < 23 && jam >= 19) {
    say.innerHTML ='GoodNight<i id="logo" class="fa fa-moon">'
  }
  return [jam,min,sec,tgl];
}

//run jam
setInterval(() => {
  let waktu = jam();
  let jm = waktu[0] < 10 ? "0" + waktu[0] : waktu[0];
  let mn = waktu[1] < 10 ? "0" + waktu[1] : waktu[1];
  let dt = waktu[2] < 10 ? "0" + waktu[2] : waktu[2];
  let transform = "rotate("+ waktu[2]/60*360 +"deg)";
  let jamm = "rotate("+ (waktu[0]/12)*360 +"deg)";
  let mnt = "rotate("+ waktu[1]/60*360 +"deg)";
  cvr.style.webkitTransform = transform;
  jarumJam.style.webkitTransform = jamm;
  menit.style.webkitTransform = mnt;
 // $("#menit").style.webkitTransform = mnt;
  
  $("#jm").text(jm);
  $("#mn").text(mn);
  $("#dt").text(dt);
},1000);

//isi option filter kota
$.ajax({
  url : "https://api.banghasan.com/sholat/format/json/kota",
  success : function(rsl) {
    
    for (let i = 0; i < rsl.kota.length; i++) {
      let opt = document.createElement("option");
      let txt = document.createTextNode(rsl.kota[i].nama)
      opt.appendChild(txt)
      opt.setAttribute("name",txt)
      opt.value = rsl.kota[i].id +"-"+rsl.kota[i].nama
      search.appendChild(opt)
    }
  }
})

//fungsi filter
var dataApi = null;
function filter(idkot,tgll) {
  let tgl = tgll[3]
  tgl = tgl.split("-")
  let th = tgl[0]
  let bl = tgl[1] < 10 ? "0"+tgl[1] : tgl[1]
  let tg = tgl[2] < 10 ? "0"+tgl[2] : tgl[2]
  tgl = [th,bl,tg]
  kota.textContent = idkot.split("-")[1]
  $("#cari").hide()
  $.ajax({
    url : "https://api.banghasan.com/sholat/format/json/jadwal/kota/"+ idkot.split("-")[0] +"/tanggal/"+tgl.join("-"),
    success : function (res) {
      console.log(res)
      //console.log(res.jadwal.data)
      //jadwal(res.jadwal.data)
      let obj = res.jadwal.data
      imsak.textContent = obj.imsak
      duha.textContent = obj.dhuha
      terbit.textContent = obj.terbit
      subuh.textContent = obj.subuh
      duhur.textContent = obj.dzuhur
      ashar.textContent = obj.ashar
      magrib.textContent = obj.maghrib
      isya.textContent = obj.isya 
      tanggal.textContent = obj.tanggal
      now.textContent = jam()[0]+":"+jam()[1]
      dataApi = res.jadwal.data;
      let hh = jam()
     // clearInterval(x);
      aft = after(res.jadwal.data,jam())
     // console.log(hh.join("x"))
      cn(jadwal(dataApi,jam()),hh)
      randomTxt(jam(),res.jadwal.data)
    }
  })
}
//random textContent
function randomTxt(jam,obj) {
  let h = jam[0]
  let m = jam[1]
  let rdm = [
              'Mohon Maaf Masih Banyak Bug <i class="fa fa-bug"></i>,'+ 
              'Karena Pembuatannya tidak direncanakan dan diperhitungkan',
              "Semoga Jadwal Shalat Ini Bisa Bermanfaat",
              'untuk referensi scrip bisa minta langsung ke <br> <a href="https://t.me/robbett"><i class="fab fa-telegram"></i> @robbett</a>'+
              ' atau kunjungi <a href="https:/github.com/robbet88/"><i class="fab fa-github"></i> robbet88 </a>',
              "Created By Saripdn",
              'Untuk Info API yang digunakan bisa klik <a href="https://fathimah.docs.apiary.io/#introduction/dokumentasi"> <i class="fa fa-info-circle"></i>Fathimah Bot</a>',
              "mohon maaf jika ada kesalahan <br>---Halaman Ini Masih Dalam Pengembangan---<br>:D",
              "Selamat Menunaikan Ibadah Puasa",
              "Terima Kasih Telah Mengunjungi Halaman Saya :)",
              "Jangan Lupa Shalat 5 Waktu:)",
              'Jika Ingin Mengubah Kota Klik icon <i class="fa fa-filter"></i> diatas'
            ]
  if (h >= obj.maghrib.split(":")[0] && h >= obj.maghrib.split(":")[1]) {
    txt.textContent = "Selamat Berbuka Puasa"
  }else{
    setInterval(() => {
      let pilih = Math.floor(Math.random()*rdm.length)
      txt.innerHTML = rdm[pilih]
    },5000)
  }
}
maniik()
function maniik() {
  let warna = ["#0092ffb1","#ff0070b3","#15c700b2","#ffc500b2"]
  setInterval(() => {
    let dv = document.createElement("div")
    let bg = Math.floor(Math.random()*warna.length)
    let sz = Math.floor(Math.random()*20)
    let x = Math.floor(Math.random()*100)
    sz = sz < 5 ? 5 : sz;
    dv.style.width = sz+"px"
    dv.style.height= sz+"px"
    dv.style.position = "absolute"
   dv.style.bottom = -4+"px"
    dv.style.left = x+"%"
    dv.style.transition = "1s"
    dv.style.animation = "up 3s linear infinite"
    dv.style.background = warna[bg];
    
    manik.appendChild(dv)
    setTimeout(function() {
      dv.remove()
    },2900);
  },200)
}

function after(obj,ja) {
  let imsak = obj.imsak,
      subuh = obj.subuh,
      duhur = obj.dzuhur,
      ashar = obj.ashar,
      magrib = obj.maghrib,
      isya = obj.isya,
      jam = ja[0],
      mn = ja[1]
 
  if (jam >= imsak.split(":")[0] && jam <= subuh.split(":")[0] && mn < subuh.split(":")[1]) {
    return "imsak"
  }else if (jam >= subuh.split(":")[0] && jam <= duhur.split(":")[0] && mn < duhur.split(":")[1]) {
    return "subuh"
  }else if (jam >= duhur.split(":")[0] && jam <= ashar.split(":")[0] && mn < ashar.split(":")[1]) {
    return "duhur"
  }else if (jam >= ashar.split(":")[0] && jam <= magrib.split(":")[0] && mn < magrib.split(":")[1]) {
    return "ashar"
  }else if (jam >= magrib.split(":")[0] && jam <= isya.split(":")[0] && mn < isya.split(":")[1]) {
    return "isya"
  }else if (jam >= isya.split(":")[0] && jam < 23) {
    return "isya"
  }else{
    console.log("gkada")
  }
}
//membuat jadwal
function jadwal(obj,waktu) {
  let imsak = obj.imsak,
      subuh = obj.subuh,
      duhur = obj.dzuhur,
      ashar = obj.ashar,
      magrib = obj.maghrib,
      isya = obj.isya,
      tgl = obj.tanggal,
      jam = waktu[0],
      menit = waktu[1];
  if(jam <= imsak.split(":")[0] && menit <= imsak.split(":")[1]) {
  
    return {
      "stts" : "Imsak",
      "jam" : jam,
      "menit" : menit,
      "data" :new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+imsak+":00").getTime(),
    }
  }else if(jam <= subuh.split(":")[0] && aft == "imsak") {
  
    return {
      "stts" : "subuh",
      "jam" : jam,
      "menit" : menit,
      "data" : new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+subuh+":00").getTime(),
    }
  }else if(jam <= duhur.split(":")[0] && aft == "subuh") {
  
    return {
      "stts" : "duhur",
      "jam" : jam,
      "menit" : menit,
      "data" : new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+duhur+":00").getTime(),
    }
  }else if(jam <= ashar.split(":")[0] && aft == "duhur" ){
    
    return {
      "stts" : "ashar",
      "jam" : jam,
      "menit" : menit,
      "data" : new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+ashar+":00").getTime(),
    }
  }else if(jam <= magrib.split(":")[0] && aft == "ashar") {
    return {
      "stts" : "magrib",
      "jam" : jam,
      "menit" : menit,
      "data" : new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+magrib+":00").getTime(),
    }
  }else if(jam <= isya.split(":")[0] && aft == "magrib") {
    return {
      "stts" : "isya",
      "jam" : jam,
      "menit" : menit,
      "data" : new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+isya+":00").getTime(),
    }
  }else
  {
    console.log("gagal")
  }
}


//fungsi hitung mundur
function cn(jadwal,waktu) {
  console.log(waktu)
  let jum = waktu[0]
  let men = waktu[1]
  clearInterval(x)
  if (jum <= jadwal.jam) {
    wait.textContent = jadwal.stts
    hitung(jadwal.data,jadwal.stts)
  }
 // console.log(jadwal.tanggal.split(" "))
  //console.log(jadwal.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+obj.imsak+":00")
// Memperbarui hitungan mundur setiap 1 detik
  
}


function hitung(data,stts) {
  let countDownDate = data
  x = setInterval(function() {
  // Untuk mendapatkan tanggal dan waktu hari ini
    let now = new Date().getTime();
      
    // Temukan jarak antara sekarang dan tanggal hitung mundur
    let distance = countDownDate - now;
      
    // Perhitungan waktu untuk hari, jam, menit dan detik
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    hours = hours < 10 ? "0"+hours : hours;
    minutes = minutes < 10 ? "0"+minutes : minutes;
    seconds = seconds < 10 ? "0"+seconds : seconds;
    countdown.textContent = [hours,minutes,seconds].join(" : ")

    // Jika hitungan mundur selesai, tulis beberapa teks 
    if (distance <= 0) {
      //clearInterval(x)
      countdown.textContent = "--------"
      countdown.classList.add("kedip")
      setTimeout(function() {
        countdown.classList.remove("kedip")
      }, 10000);
      setTimeout(() => {
        cn(jadwal(dataApi,jam()),jam())
      }, 5000);
      //cn(jadwal(dataApi,jam()),jam())
    }
  }, 1000);
}
