$("#cari").hide()

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
  let jamm = "rotate("+ ((waktu[0]/12)*360)+20 +"deg)";
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
      dataApi = res.jadwal.data;
      let hh = jam()
      clearInterval(x);
     // console.log(hh.join("x"))
      cn(jadwal(dataApi,jam()),hh)
      
    }
  })
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
      console.log(jam,imsak.split(":")[1])
  if(jam <= imsak.split(":")[0] && menit <= imsak.split(":")[1]) {
    return {
      "stts" : "Imsak",
      "jam" : jam,
      "menit" : menit,
      "data" :new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+imsak+":00").getTime(),
    }
  }else if(jam <= subuh.split(":")[0] && menit <= subuh.split(":")[1]) {
    return {
      "stts" : "subuh",
      "jam" : jam,
      "menit" : menit,
      "data" : new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+subuh+":00").getTime(),
    }
  }else if(jam <= duhur.split(":")[0] && menit <= duhur.split(":")[1]) {
    return {
      "stts" : "duhur",
      "jam" : jam,
      "menit" : menit,
      "data" : new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+duhur+":00").getTime(),
    }
  }else if(jam <= ashar.split(":")[0]){
    return {
      "stts" : "ashar",
      "jam" : jam,
      "menit" : menit,
      "data" : new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+ashar+":00").getTime(),
    }
  }else if(jam <= magrib.split(":")[0] && menit <= magrib.split(":")[1]) {
    return {
      "stts" : "magrib",
      "jam" : jam,
      "menit" : menit,
      "data" : new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+magrib+":00").getTime(),
    }
  }else if(jam <= isya.split(":")[0] && menit <= isya.split(":")[1]) {
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
  console.log(jadwal)
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
      clearInterval(x)
      cn(jadwal(dataApi,jam()),jam())
    }
  }, 1000);
}