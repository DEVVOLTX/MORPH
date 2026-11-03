
(function(){
var KEY='setcount-v1';
var pad=function(n){return String(n).padStart(2,'0')};
var dk=function(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
var addDays=function(d,n){var x=new Date(d);x.setDate(x.getDate()+n);return x};
var fmt=function(n){return Math.round(n).toLocaleString('en-US')};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var DAYS=['Sat','Sun','Mon','Tue','Wed','Thu','Fri'];

/* Exercise library: name, muscle, equipment, barbell(1/0), kg step, start kg, reps, sets */
var MUSCLES=[['Chest','صدر'],['Back','ظهر'],['Shoulders','أكتاف'],['Biceps','بايسبس'],['Triceps','ترايسبس'],['Legs','أرجل'],['Abs','بطن'],['Forearms','سواعد']];
var RAW=[
['Bench Press','Chest','Barbell',1,2.5,60,8,4],['Incline Bench Press','Chest','Barbell',1,2.5,50,8,3],
['Dumbbell Bench Press','Chest','Dumbbell',0,2,26,10,3],['Incline Dumbbell Press','Chest','Dumbbell',0,2,24,10,3],
['Cable Fly','Chest','Cable',0,2.5,15,12,3],['Pec Deck Fly','Chest','Machine',0,2.5,40,12,3],
['Dips','Chest','Bodyweight',0,2.5,0,10,3],['Dumbbell Pullover','Chest','Dumbbell',0,2,20,12,3],['Lever Chest Press','Chest','Machine',0,5,40,10,3],['Lever Chest Press (Plates)','Chest','Machine',0,5,30,10,3],['Lever Lying Chest Press','Chest','Machine',0,5,30,10,3],
['Deadlift','Back','Barbell',1,5,100,5,3],['Barbell Row','Back','Barbell',1,2.5,60,8,3],
['Lat Pulldown','Back','Cable',0,2.5,50,10,3],['Pull-up','Back','Bodyweight',0,2.5,0,8,3],
['Seated Cable Row','Back','Cable',0,2.5,45,10,3],['One-Arm Dumbbell Row','Back','Dumbbell',0,2,28,10,3],
['Chest-Supported Row','Back','Machine',0,2.5,40,10,3],['Straight-Arm Pulldown','Back','Cable',0,2.5,25,12,3],
['Overhead Press','Shoulders','Barbell',1,2.5,40,8,3],['Dumbbell Shoulder Press','Shoulders','Dumbbell',0,2,20,10,3],
['Arnold Press','Shoulders','Dumbbell',0,2,18,10,3],['Lateral Raise','Shoulders','Dumbbell',0,1,10,12,3],['Dumbbell Standing Overhead Press','Shoulders','Dumbbell',0,2,18,10,3],['Cable One Arm Lateral Raise','Shoulders','Cable',0,1.25,5,12,3],
['Rear Delt Fly','Shoulders','Dumbbell',0,1,8,15,3],['Face Pull','Shoulders','Cable',0,2.5,20,15,3],
['Barbell Shrug','Shoulders','Barbell',1,5,80,12,3],
['Barbell Curl','Biceps','Barbell',1,2.5,30,10,3],['Dumbbell Curl','Biceps','Dumbbell',0,2,12,10,3],
['Hammer Curl','Biceps','Dumbbell',0,2,14,10,3],['Preacher Curl','Biceps','Machine',0,2.5,25,10,3],
['Incline Dumbbell Curl','Biceps','Dumbbell',0,2,10,10,3],['Cable Curl','Biceps','Cable',0,2.5,25,12,3],
['Triceps Pushdown','Triceps','Cable',0,2.5,25,12,3],['Overhead Triceps Extension','Triceps','Cable',0,2.5,20,12,3],
['Skull Crusher','Triceps','EZ bar',0,2.5,25,10,3],['Close-Grip Bench Press','Triceps','Barbell',1,2.5,60,8,3],
['Triceps Kickback','Triceps','Dumbbell',0,1,10,12,3],
['Squat','Legs','Barbell',1,5,80,6,4],['Front Squat','Legs','Barbell',1,5,60,8,3],
['Leg Press','Legs','Machine',0,10,140,10,3],['Romanian Deadlift','Legs','Barbell',1,5,80,8,3],
['Leg Extension','Legs','Machine',0,5,45,12,3],['Leg Curl','Legs','Machine',0,5,40,12,3],
['Walking Lunge','Legs','Dumbbell',0,2,16,12,3],['Bulgarian Split Squat','Legs','Dumbbell',0,2,16,10,3],
['Hip Thrust','Legs','Barbell',1,5,80,10,3],['Standing Calf Raise','Legs','Machine',0,5,60,15,4],
['Seated Calf Raise','Legs','Machine',0,5,40,15,4],
['Crunch','Abs','Bodyweight',0,2.5,0,20,3],['Hanging Leg Raise','Abs','Bodyweight',0,2.5,0,12,3],
['Cable Crunch','Abs','Cable',0,2.5,30,15,3],['Ab Wheel Rollout','Abs','Bodyweight',0,2.5,0,10,3],
['Arms Overhead Full Sit-up','Abs','Bodyweight',0,2.5,0,15,3],['Dumbbell Split Stance Single Arm Overhead Press','Shoulders','Dumbbell',0,2,12,10,3],['Dumbbell Alternate Vertical Raise','Shoulders','Dumbbell',0,1,8,12,3],['Dumbbell Front Raise','Shoulders','Dumbbell',0,1,8,12,3],['Cable Front Raise','Shoulders','Cable',0,1.25,10,12,3],['Smith Seated Shoulder Press','Shoulders','Machine',0,2.5,30,10,3],['Dumbbell Squat to Overhead Press','Legs','Dumbbell',0,2,12,10,3],['Weighted Plate Standing Overhead Press','Shoulders','Plate',0,2.5,10,12,3],['Barbell Seated Overhead Press','Shoulders','Barbell',1,2.5,30,8,3],['Barbell Narrow Stance Squat','Legs','Barbell',1,5,60,8,3],['Barbell One Arm Bent over Row','Back','Barbell',0,2.5,30,10,3],['Barbell Lying Row on Rack','Back','Barbell',1,2.5,40,10,3],['Barbell Bent Over Wide Grip Row','Back','Barbell',1,2.5,50,8,3],['Dumbbell Incline Hammer Curl','Biceps','Dumbbell',0,2,10,10,3],['Cable Rope Hammer Preacher Curl','Biceps','Cable',0,2.5,20,12,3],['Seated Hammer Curl','Biceps','Dumbbell',0,2,12,10,3],['Barbell Palms Down Wrist Curl Over A Bench','Forearms','Barbell',0,2.5,20,15,3],['EZ Barbell Preacher Curl','Biceps','EZ bar',0,2.5,20,10,3],['EZ Barbell Spider Curl','Biceps','EZ bar',0,2.5,15,10,3],['Cable Lying Face Pull','Shoulders','Cable',0,2.5,15,15,3],['Hammer Curl 2','Biceps','Dumbbell',0,2,14,10,3],['Dumbbell Squeeze Bench Press','Chest','Dumbbell',0,2,22,10,3],['Russian Twist','Abs','Dumbbell',0,2,8,20,3],
['Wrist Curl','Forearms','Dumbbell',0,1,12,15,3],['Reverse Barbell Curl','Forearms','Barbell',1,2.5,25,12,3],
['Sled 45° Leg Press','Legs','Machine',0,10,140,10,3],['Sled 45° Leg Wide Press','Legs','Machine',0,10,140,10,3],['Lever Seated Leg Press','Legs','Machine',0,5,80,10,3],['Lever Seated Leg Press 2','Legs','Machine',0,5,80,10,3],['Dumbbell Military Press Russian Twist','Shoulders','Dumbbell',0,2,10,12,3],['Dumbbell Seated Military Press In Out','Shoulders','Dumbbell',0,2,14,10,3],
['Standing Leg Calf Raise','Legs','Barbell',1,5,60,15,4],['Hanging Leg Hip Raise','Abs','Bodyweight',0,2.5,0,12,3],['Side Plank Hip Adduction','Abs','Bodyweight',0,2.5,0,12,3],['Reverse plank','Abs','Bodyweight',0,2.5,0,30,3],['Side Plank','Abs','Bodyweight',0,2.5,0,30,3],['Front Plank','Abs','Bodyweight',0,2.5,0,30,3],['Push-up','Chest','Bodyweight',0,2.5,0,15,3],['Leg Extension Plank','Abs','Bodyweight',0,2.5,0,12,3],
['Walking on Treadmill','Legs','Machine',0,2.5,0,20,1],['One arm Wrist Curl','Forearms','Dumbbell',0,1,10,15,3],['Stationary Bike Run','Legs','Machine',0,2.5,0,20,1],['Rowing','Back','Machine',0,2.5,0,20,1],
['Russian Twist','Abs','Bodyweight',0,2.5,0,20,3],['Cable Side Crunch','Abs','Cable',0,2.5,20,12,3],['Cable Kneeling Crunch','Abs','Cable',0,2.5,30,15,3],
['Lever Pec Deck Fly','Chest','Machine',0,2.5,40,12,3],['Dumbbell One Arm Bent over Row','Back','Dumbbell',0,2,24,10,3],['Cable Seated One Arm Alternate Row','Back','Cable',0,2.5,20,10,3]
];
var IMG={'Dumbbell Squeeze Bench Press':{a:'assets/9d82a9c61539.jpg',m:'assets/497b36104381.jpg'},
'Hammer Curl 2':{a:'assets/50474f1d0996.jpg',m:'assets/cd660529568b.jpg'},
'Deadlift':{a:'assets/312b835c598f.jpg',m:'assets/ef0de3fb33b5.jpg'},
'Dumbbell Incline Hammer Curl':{a:'assets/9cb8bc3ec52f.jpg',m:'assets/9106b889e541.jpg'},
'Cable Rope Hammer Preacher Curl':{a:'assets/28856803036f.jpg',m:'assets/642e9a1bc702.jpg'},
'Seated Hammer Curl':{a:'assets/db5b0e31da92.jpg',m:'assets/5880433e0393.jpg'},
'Hammer Curl':{a:'assets/f1cebe0e4626.jpg',m:'assets/9106b889e541.jpg'},
'Barbell Palms Down Wrist Curl Over A Bench':{a:'assets/10b8307931a0.jpg',m:'assets/44bb055401a4.jpg'},
'EZ Barbell Preacher Curl':{a:'assets/d3726eab12d0.jpg',m:'assets/f5decdbdf47f.jpg'},
'EZ Barbell Spider Curl':{a:'assets/2b0d0c574434.jpg',m:'assets/9106b889e541.jpg'},
'Cable Lying Face Pull':{a:'assets/a1d4a7fb0632.jpg',m:'assets/c689a757dc56.jpg'},
'Barbell Curl':{a:'assets/6503ba28c870.jpg',m:'assets/9106b889e541.jpg'},
'Dumbbell Squat to Overhead Press':{a:'assets/93c39b9a08ce.jpg',m:'assets/e6aee1ca094d.jpg'},
'Weighted Plate Standing Overhead Press':{a:'assets/dd32da801dc6.jpg',m:'assets/66d542f83a17.jpg'},
'Barbell Seated Overhead Press':{a:'assets/a61479732b4f.jpg',m:'assets/e7238b7e4937.jpg'},
'Barbell Narrow Stance Squat':{a:'assets/f577bd823766.jpg',m:'assets/f763f83ddb62.jpg'},
'Barbell One Arm Bent over Row':{a:'assets/1b5d8af5ed0c.jpg',m:'assets/da312b7249aa.jpg'},
'Barbell Lying Row on Rack':{a:'assets/5372fa7006ea.jpg',m:'assets/4b361ea93f09.jpg'},
'Barbell Bent Over Wide Grip Row':{a:'assets/d0801cf04a08.jpg',m:'assets/4b361ea93f09.jpg'},
'Incline Bench Press':{a:'assets/6ad1512676af.jpg',m:'assets/103e692d04e3.jpg'},
'Arms Overhead Full Sit-up':{a:'assets/790cae81dff2.jpg',m:'assets/ba9a8144175e.jpg'},
'Dumbbell Split Stance Single Arm Overhead Press':{a:'assets/3c705d7b791c.jpg',m:'assets/d9154cd18b49.jpg'},
'Dumbbell Alternate Vertical Raise':{a:'assets/f381f7d6bbcd.jpg',m:'assets/3d6d07e34217.jpg'},
'Dumbbell Front Raise':{a:'assets/e7c12a9cba39.jpg',m:'assets/3d6d07e34217.jpg'},
'Cable Front Raise':{a:'assets/e40bdcb10de2.jpg',m:'assets/3d6d07e34217.jpg'},
'Arnold Press':{a:'assets/b407754f0772.jpg',m:'assets/d818809e6189.jpg'},
'Smith Seated Shoulder Press':{a:'assets/4967dec67525.jpg',m:'assets/5dc372233371.jpg'},
'Dumbbell Standing Overhead Press':{a:'assets/1e65e8dbfc89.jpg',m:'assets/262595e9bc03.jpg'},
'Overhead Triceps Extension':{a:'assets/b8e9b86668af.jpg',m:'assets/3eaf0f261059.jpg'},
'Cable One Arm Lateral Raise':{a:'assets/41bd3faa51cf.jpg',m:'assets/b6875a050c4c.jpg'},
'Bench Press':{a:'assets/62851cdb34ea.jpg',m:'assets/f2cc49ade462.jpg'},
'Cable Fly':{a:'assets/8f098a4a2330.jpg',m:'assets/852dfde9dd0b.jpg'},
'Lever Chest Press (Plates)':{a:'assets/65a29afed979.jpg',m:'assets/5f2af2a449bd.jpg'},
'Dips':{a:'assets/6e357d0f681d.jpg',m:'assets/d8453d63247c.jpg'},
'Lever Chest Press':{a:'assets/2475c9fdb5f9.jpg',m:'assets/f2cc49ade462.jpg'},
'Lever Lying Chest Press':{a:'assets/dcfa278708a2.jpg',m:'assets/f2cc49ade462.jpg'},
'Dumbbell Shoulder Press':{a:'assets/d8ea252f85bf.jpg',m:'assets/5dc372233371.jpg'},
'Incline Dumbbell Press':{a:'assets/2685948c86d0.jpg',m:'assets/4b14eabf6576.jpg'},
'Triceps Pushdown':{a:'assets/e5231fa3ce2d.jpg',m:'assets/3eaf0f261059.jpg'},
'Lateral Raise':{a:'assets/a783c4f7b779.jpg',m:'assets/cc764e669394.jpg'}};
IMG['Romanian Deadlift']=({'Romanian Deadlift':{a:'assets/0edc692b6ebb.jpg',m:'assets/35ebcbea7d7a.jpg'}})['Romanian Deadlift'];
IMG['Sled 45° Leg Wide Press']=({'Sled 45° Leg Wide Press':{a:'assets/bf61cd4eab57.jpg',m:'assets/8ff298e604f2.jpg'}})['Sled 45° Leg Wide Press'];
IMG['Sled 45° Leg Press']=({'Sled 45° Leg Press':{a:'assets/7b3101aca126.jpg',m:'assets/487688fadbdf.jpg'}})['Sled 45° Leg Press'];
IMG['Lever Seated Leg Press']=({'Lever Seated Leg Press':{a:'assets/d50af03045dc.jpg',m:'assets/487688fadbdf.jpg'}})['Lever Seated Leg Press'];
IMG['Lever Seated Leg Press 2']=({'Lever Seated Leg Press 2':{a:'assets/784b1b815c57.jpg',m:'assets/487688fadbdf.jpg'}})['Lever Seated Leg Press 2'];
IMG['Dumbbell Military Press Russian Twist']=({'Dumbbell Military Press Russian Twist':{a:'assets/e0a798536e75.jpg',m:'assets/ec8570adfdbb.jpg'}})['Dumbbell Military Press Russian Twist'];
IMG['Dumbbell Seated Military Press In Out']=({'Dumbbell Seated Military Press In Out':{a:'assets/18726f7176ba.jpg',m:'assets/f50c16a7d0c2.jpg'}})['Dumbbell Seated Military Press In Out'];
IMG['Leg Press']=IMG['Sled 45° Leg Press'];
IMG['Standing Calf Raise']=({'Standing Calf Raise':{a:'assets/d881d6e6a335.jpg',m:'assets/613e29e6d6d3.jpg'}})['Standing Calf Raise'];
IMG['Standing Leg Calf Raise']=({'Standing Leg Calf Raise':{a:'assets/a432bc5d8936.jpg',m:'assets/613e29e6d6d3.jpg'}})['Standing Leg Calf Raise'];
IMG['Hanging Leg Raise']=({'Hanging Leg Raise':{a:'assets/1e0b531915b7.jpg',m:'assets/c9de10d52fd1.jpg'}})['Hanging Leg Raise'];
IMG['Hanging Leg Hip Raise']=({'Hanging Leg Hip Raise':{a:'assets/5e1bb22eda44.jpg',m:'assets/1382b435d375.jpg'}})['Hanging Leg Hip Raise'];
IMG['Side Plank Hip Adduction']=({'Side Plank Hip Adduction':{a:'assets/02be3783ab24.jpg',m:'assets/c3316344d018.jpg'}})['Side Plank Hip Adduction'];
IMG['Reverse plank']=({'Reverse plank':{a:'assets/3b9b56b41058.jpg',m:'assets/9546dcd75cfd.jpg'}})['Reverse plank'];
IMG['Side Plank']=({'Side Plank':{a:'assets/a956ada5c945.jpg',m:'assets/170c622e8c6e.jpg'}})['Side Plank'];
IMG['Front Plank']=({'Front Plank':{a:'assets/c7220d211a98.jpg',m:'assets/d7b1aa3530bb.jpg'}})['Front Plank'];
IMG['Push-up']=({'Push-up':{a:'assets/b0f7df528b7d.jpg',m:'assets/20a2c64b2953.jpg'}})['Push-up'];
IMG['Leg Extension Plank']=({'Leg Extension Plank':{a:'assets/9033b65ca10a.jpg',m:'assets/a19543a7b324.jpg'}})['Leg Extension Plank'];
IMG['Walking on Treadmill']=({'Walking on Treadmill':{a:'assets/2dc4743bfc4e.jpg',m:'assets/df80e71df10c.jpg'}})['Walking on Treadmill'];
IMG['One arm Wrist Curl']=({'One arm Wrist Curl':{a:'assets/b0b538c7a4e9.jpg',m:'assets/375301ef3284.jpg'}})['One arm Wrist Curl'];
IMG['Wrist Curl']=({'Wrist Curl':{a:'assets/0a0d12d759f2.jpg',m:'assets/375301ef3284.jpg'}})['Wrist Curl'];
IMG['Stationary Bike Run']=({'Stationary Bike Run':{a:'assets/96696f4df48d.jpg',m:'assets/30724d44f028.jpg'}})['Stationary Bike Run'];
IMG['Rowing']=({'Rowing':{a:'assets/b67c6c378456.jpg',m:'assets/a64e4fd98797.jpg'}})['Rowing'];
IMG['Reverse Barbell Curl']=({'Reverse Barbell Curl':{a:'assets/f8de761a7671.jpg',m:'assets/1877e9d816ff.jpg'}})['Reverse Barbell Curl'];
IMG['Russian Twist']=({'Russian Twist':{a:'assets/d2df36b371c4.jpg',m:'assets/1ecacde66766.jpg'}})['Russian Twist'];
IMG['Cable Side Crunch']=({'Cable Side Crunch':{a:'assets/7c68f46b7ab2.jpg',m:'assets/170c622e8c6e.jpg'}})['Cable Side Crunch'];
IMG['Cable Kneeling Crunch']=({'Cable Kneeling Crunch':{a:'assets/766bdf3d0b14.jpg',m:'assets/c9de10d52fd1.jpg'}})['Cable Kneeling Crunch'];
IMG['Hip Thrust']=({'Hip Thrust':{a:'assets/cca345b0acae.jpg',m:'assets/5f1bce48f8f8.jpg'}})['Hip Thrust'];
IMG['Bulgarian Split Squat']=({'Bulgarian Split Squat':{a:'assets/db35c8114875.jpg',m:'assets/487688fadbdf.jpg'}})['Bulgarian Split Squat'];
IMG['Front Squat']=({'Front Squat':{a:'assets/dc1b22112cd6.jpg',m:'assets/487688fadbdf.jpg'}})['Front Squat'];
IMG['Lever Pec Deck Fly']=({'Lever Pec Deck Fly':{a:'assets/2c3c0c324147.jpg',m:'assets/3006c4cfd295.jpg'}})['Lever Pec Deck Fly'];
IMG['Pull-up']=({'Pull-up':{a:'assets/bd5d4033e6ad.jpg',m:'assets/a0c80d2194ba.jpg'}})['Pull-up'];
IMG['Dumbbell One Arm Bent over Row']=({'Dumbbell One Arm Bent over Row':{a:'assets/2aa6eb2b0a50.jpg',m:'assets/250adaf42af5.jpg'}})['Dumbbell One Arm Bent over Row'];
IMG['Cable Seated One Arm Alternate Row']=({'Cable Seated One Arm Alternate Row':{a:'assets/ac4ed32b8b8e.jpg',m:'assets/4a73ecb223a9.jpg'}})['Cable Seated One Arm Alternate Row'];
IMG['Pec Deck Fly']=IMG['Lever Pec Deck Fly'];IMG['One-Arm Dumbbell Row']=IMG['Dumbbell One Arm Bent over Row'];
IMG['Leg Curl']=({'Leg Curl':{a:'assets/d224eff833cd.jpg',m:'assets/faf546145b3d.jpg'}})['Leg Curl'];
IMG['Leg Extension']=({'Leg Extension':{a:'assets/4465481f8ce6.jpg',m:'assets/3ad4cba349c5.jpg'}})['Leg Extension'];
IMG['Skull Crusher']=({'Skull Crusher':{a:'assets/434bf86ad380.jpg',m:'assets/957fd7c4e308.jpg'}})['Skull Crusher'];
IMG['Straight-Arm Pulldown']=({'Straight-Arm Pulldown':{a:'assets/9b02fcc5a6b7.jpg',m:'assets/82cc7ce8dc66.jpg'}})['Straight-Arm Pulldown'];
IMG['Seated Cable Row']=({'Seated Cable Row':{a:'assets/1c2314ae1c9f.jpg',m:'assets/5b3cf70e5e79.jpg'}})['Seated Cable Row'];
IMG['Overhead Press']=IMG['Barbell Seated Overhead Press'];
IMG['Barbell Row']=IMG['Barbell Bent Over Wide Grip Row'];
IMG['Squat']=IMG['Barbell Narrow Stance Squat'];
IMG['Face Pull']=IMG['Cable Lying Face Pull'];
var MIMG={'Chest':'assets/f645d124fcb6.jpg',
'Biceps':'assets/13c87fdf83ae.jpg',
'Triceps':'assets/824f9f1f2691.jpg',
'Back':'assets/79aff793ec82.jpg',
'Shoulders':'assets/e99d781ac1fa.jpg',
'Abs':'assets/7c6b129c7e7e.jpg',
'Legs':'assets/c2317cdfe19d.jpg',
'Forearms':'assets/702fcaf263d2.jpg'};
var EQS=['Barbell', 'Dumbbell', 'Cable', 'Machine', 'EZ bar', 'Plate', 'Bodyweight'];
var EQIMG={'Barbell':'assets/92da42aed7ef.jpg',
'Dumbbell':'assets/438eabb556b4.jpg',
'Cable':'assets/058a0c109fdd.jpg',
'Machine':'assets/16115a8880ea.jpg',
'EZ bar':'assets/c4d84c4bb46e.jpg',
'Plate':'assets/be09b5d6437b.jpg',
'Bodyweight':'assets/29e2bf18d3ae.jpg'};
function exerciseByName(name){return LIB.concat(S&&S.customExercises||[]).filter(function(ex){return ex.n===name})[0]||null}
function isFavorite(name){return !!(S&&S.favorites&&S.favorites.indexOf(name)>=0)}
function libraryMuscles(){
  var groups=MUSCLES.slice();
  (S.customExercises||[]).forEach(function(ex){if(!groups.some(function(m){return m[0]===ex.m}))groups.push([ex.m,''])});
  return groups;
}
function libraryEquipment(){
  var equipment=EQS.slice();
  (S.customExercises||[]).forEach(function(ex){if(equipment.indexOf(ex.eq)<0)equipment.push(ex.eq)});
  return equipment;
}
function compressExercisePhoto(file){
  return new Promise(function(resolve,reject){
    if(!file||!/^image\/(?:jpeg|png|webp|heic|heif|avif)$/i.test(file.type)||file.size>10*1024*1024){
      reject(new Error('Choose an image smaller than 10 MB'));return;
    }
    function encode(image,close){
      try{
        var scale=Math.min(1,720/Math.max(image.width,image.height));
        var canvas=document.createElement('canvas');
        canvas.width=Math.max(1,Math.round(image.width*scale));canvas.height=Math.max(1,Math.round(image.height*scale));
        var ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);
        var data=canvas.toDataURL('image/jpeg',0.72);
        if(data.length>600000){reject(new Error('This photo is still too large after compression. Choose a smaller image'));return}
        resolve(data);
      }catch(error){reject(error)}
      finally{if(close)close()}
    }
    if(typeof createImageBitmap==='function'){
      createImageBitmap(file).then(function(bitmap){encode(bitmap,function(){bitmap.close()})}).catch(reject);
      return;
    }
    var reader=new FileReader();
    reader.onerror=function(){reject(new Error('The photo could not be read'))};
    reader.onload=function(){
      var image=new Image();
      image.onerror=function(){reject(new Error('This image format is not supported by this browser'))};
      image.onload=function(){encode(image)};
      image.src=reader.result;
    };
    reader.readAsDataURL(file);
  });
}
function thumb(n){var i=IMG[n],x=exerciseByName(n);return i?'<img class="thumb" src="'+i.a+'" alt="" loading="lazy">':x&&x.photo?'<img class="thumb" src="'+esc(x.photo)+'" alt="" loading="lazy">':''}
function guide(n,musOnly){var i=IMG[n];return i?'<section class="card guide">'+(musOnly?'':'<h3>How to do it</h3><img src="'+i.a+'" alt="'+esc(n)+' demonstration">')+'<h3>Target muscles</h3><img class="mus" src="'+i.m+'" alt="Muscles worked: front and back"></section>':''}
var LIB=RAW.map(function(r){return{n:r[0],m:r[1],eq:r[2],bar:!!r[3],step:r[4],kg:r[5],reps:r[6],sets:r[7]}});
function mkEx(name){
  var x=exerciseByName(name);if(!x)return null;
  var s=[];for(var i=0;i<x.sets;i++)s.push({kg:x.kg,reps:x.reps,done:false});
  return{n:x.n,g:x.m,bar:x.bar,step:x.step,sets:s};
}
function mkSession(name,names){return{name:name,startedAt:null,ex:names.map(mkEx).filter(Boolean)}}
function newSession(){return mkSession('Upper body strength',['Bench Press','Incline Dumbbell Press','Overhead Press','Cable Fly','Triceps Pushdown'])}
var SPLITS=[
{id:'ppl',name:'Push / Pull / Legs',short:'PPL',freq:'3 or 6 days a week',note:'Groups lifts by movement. Run it once for 3 days, or twice through for 6 days with a rest day between rounds.',days:[
 {n:'Push',m:'Chest · Shoulders · Triceps',x:['Bench Press','Overhead Press','Incline Dumbbell Press','Lateral Raise','Triceps Pushdown','Overhead Triceps Extension']},
 {n:'Pull',m:'Back · Biceps · Rear delts',x:['Deadlift','Lat Pulldown','Barbell Row','Face Pull','Barbell Curl','Hammer Curl']},
 {n:'Legs',m:'Quads · Hamstrings · Calves · Abs',x:['Squat','Romanian Deadlift','Leg Press','Leg Curl','Standing Calf Raise','Hanging Leg Raise']}]},
{id:'arnold',name:'Arnold Split',short:'Arnold',freq:'6 days a week',note:'Arnold Schwarzenegger\'s classic: chest with back, shoulders with arms, then legs. Run A, B, C, A, B, C so every muscle is hit twice a week.',days:[
 {n:'Chest & Back',m:'Chest · Back',x:['Bench Press','Incline Bench Press','Pull-up','Barbell Row','Dumbbell Pullover','Deadlift']},
 {n:'Shoulders & Arms',m:'Shoulders · Biceps · Triceps',x:['Arnold Press','Lateral Raise','Barbell Curl','Close-Grip Bench Press','Hammer Curl','Skull Crusher']},
 {n:'Legs & Abs',m:'Legs · Abs',x:['Squat','Leg Press','Leg Curl','Standing Calf Raise','Crunch']}]},
{id:'ul',name:'Upper / Lower',short:'Upper-Lower',freq:'4 days a week',note:'Upper, lower, rest, upper, lower. Each muscle twice a week with room to recover.',days:[
 {n:'Upper',m:'Chest · Back · Shoulders · Arms',x:['Bench Press','Barbell Row','Overhead Press','Lat Pulldown','Barbell Curl','Triceps Pushdown']},
 {n:'Lower',m:'Legs · Abs',x:['Squat','Romanian Deadlift','Leg Press','Leg Curl','Standing Calf Raise','Cable Crunch']}]},
{id:'bro',name:'Bro Split',short:'Bro split',freq:'5 days a week',note:'One muscle group per day, hit once a week with lots of volume.',days:[
 {n:'Chest',m:'Chest',x:['Bench Press','Incline Dumbbell Press','Cable Fly','Dips','Pec Deck Fly']},
 {n:'Back',m:'Back',x:['Deadlift','Barbell Row','Lat Pulldown','Seated Cable Row','Straight-Arm Pulldown']},
 {n:'Shoulders',m:'Shoulders · Traps',x:['Dumbbell Shoulder Press','Lateral Raise','Rear Delt Fly','Face Pull','Barbell Shrug']},
 {n:'Arms',m:'Biceps · Triceps · Forearms',x:['Barbell Curl','Close-Grip Bench Press','Hammer Curl','Skull Crusher','Cable Curl','Triceps Pushdown']},
 {n:'Legs',m:'Quads · Hamstrings · Calves',x:['Squat','Leg Press','Romanian Deadlift','Leg Extension','Leg Curl','Standing Calf Raise']}]},
{id:'fb',name:'Full Body',short:'Full body',freq:'3 days a week',note:'Whole body every session on non-consecutive days. Good for beginners and busy weeks.',days:[
 {n:'Day A',m:'Legs · Chest · Back',x:['Squat','Bench Press','Barbell Row','Lateral Raise','Cable Crunch']},
 {n:'Day B',m:'Back · Shoulders · Arms',x:['Deadlift','Overhead Press','Lat Pulldown','Triceps Pushdown','Hanging Leg Raise']},
 {n:'Day C',m:'Legs · Chest · Back',x:['Front Squat','Incline Dumbbell Press','One-Arm Dumbbell Row','Dumbbell Shoulder Press','Hammer Curl','Ab Wheel Rollout']}]},
{id:'phul',name:'PHUL',short:'PHUL',freq:'4 days a week',note:'Power Hypertrophy Upper Lower: two heavy days for strength, two higher-rep days for size.',days:[
 {n:'Power Upper',m:'Heavy upper body',x:['Bench Press','Barbell Row','Overhead Press','Pull-up','Barbell Curl','Skull Crusher']},
 {n:'Power Lower',m:'Heavy lower body',x:['Squat','Deadlift','Leg Press','Leg Curl','Standing Calf Raise']},
 {n:'Hypertrophy Upper',m:'Higher-rep upper body',x:['Incline Dumbbell Press','Seated Cable Row','Lateral Raise','Cable Fly','Cable Curl','Triceps Pushdown']},
 {n:'Hypertrophy Lower',m:'Higher-rep lower body',x:['Front Squat','Romanian Deadlift','Walking Lunge','Leg Extension','Seated Calf Raise']}]}
];
function sessionName(){return S.session.name||'Upper body strength'}
function seed(){
  var t=new Date(),steps={},vals=[6200,7800,4300,9100,8500,3900,7200];
  var off=(t.getDay()+1)%7;
  for(var i=0;i<off;i++){steps[dk(addDays(t,-off+i))]=vals[i]}
  steps[dk(t)]=5400;
  return{name:'Athlete',age:27,height:170,weight:70,goal:8000,steps:steps,water:3,sample:true,
    workouts:[
      {date:addDays(t,-1).toISOString(),name:'Upper body',volume:6420,sets:14,mins:52,sample:true},
      {date:addDays(t,-3).toISOString(),name:'Lower body',volume:9180,sets:16,mins:61,sample:true},
      {date:addDays(t,-5).toISOString(),name:'Pull day',volume:5340,sets:12,mins:47,sample:true}],
    session:newSession(),exIdx:0,waterDay:dk(t),fatigue:{},favorites:[],customExercises:[],weeklyPlan:[null,null,null,null,null,null,null]};
}
var storageNotice='';
function isRecord(value){return value!==null&&typeof value==='object'&&!Array.isArray(value)}
function normalizeState(saved){
  var validSession=isRecord(saved)&&isRecord(saved.session)&&Array.isArray(saved.session.ex)&&saved.session.ex.length>0&&saved.session.ex.every(function(ex){
    return isRecord(ex)&&typeof ex.n==='string'&&typeof ex.g==='string'&&Number.isFinite(ex.step)&&ex.step>0&&Array.isArray(ex.sets)&&ex.sets.length>0&&ex.sets.every(function(s){
      return isRecord(s)&&Number.isFinite(s.kg)&&s.kg>=0&&Number.isFinite(s.reps)&&s.reps>0&&typeof s.done==='boolean';
    });
  });
  if(!validSession)return null;
  var defaults=seed(),state=defaults,steps=Object.create(null),workouts=[],hist=Object.create(null),fatigue=Object.create(null),customExercises=[];
  Object.keys(defaults).forEach(function(key){if(Object.prototype.hasOwnProperty.call(saved,key))state[key]=saved[key]});
  if(isRecord(saved.steps))Object.keys(saved.steps).forEach(function(day){
    if(/^\d{4}-\d{2}-\d{2}$/.test(day)&&Number.isFinite(saved.steps[day])&&saved.steps[day]>=0)steps[day]=saved.steps[day];
  });
  if(Array.isArray(saved.workouts))saved.workouts.forEach(function(w){
    if(isRecord(w)&&typeof w.name==='string'&&Number.isFinite(Date.parse(w.date))&&Number.isFinite(w.volume)&&w.volume>=0&&Number.isFinite(w.sets)&&w.sets>=0&&Number.isFinite(w.mins)&&w.mins>=0)workouts.push(w);
  });
  if(isRecord(saved.hist))Object.keys(saved.hist).forEach(function(name){
    if(!Array.isArray(saved.hist[name]))return;
    hist[name]=saved.hist[name].filter(function(entry){
      return isRecord(entry)&&Number.isFinite(Date.parse(entry.d))&&Number.isFinite(entry.kg)&&entry.kg>=0&&Number.isFinite(entry.vol)&&entry.vol>=0;
    });
  });
  if(isRecord(saved.fatigue))Object.keys(saved.fatigue).forEach(function(muscle){
    var entry=saved.fatigue[muscle];
    if(isRecord(entry)&&Number.isFinite(entry.score)&&entry.score>=0&&entry.score<=100&&Number.isFinite(Date.parse(entry.updatedAt))){
      fatigue[muscle]={score:entry.score,updatedAt:entry.updatedAt};
    }
  });
  if(Array.isArray(saved.customExercises))saved.customExercises.forEach(function(ex){
    if(!isRecord(ex)||typeof ex.n!=='string'||!ex.n.trim()||ex.n.length>48||
      typeof ex.m!=='string'||!ex.m.trim()||ex.m.trim().length>32||
      typeof ex.eq!=='string'||!ex.eq.trim()||ex.eq.trim().length>32||
      !Number.isFinite(ex.step)||ex.step<=0||!Number.isFinite(ex.kg)||ex.kg<0||
      !Number.isFinite(ex.reps)||ex.reps<1||ex.reps>100||
      !Number.isFinite(ex.sets)||ex.sets<1||ex.sets>20)return;
    var lowerName=ex.n.trim().toLowerCase();
    if(LIB.some(function(item){return item.n.toLowerCase()===lowerName})||
      customExercises.some(function(item){return item.n.toLowerCase()===lowerName}))return;
    var photo=typeof ex.photo==='string'&&ex.photo.length<=600000&&/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(ex.photo)?ex.photo:'';
    customExercises.push({n:ex.n.trim(),m:ex.m.trim(),eq:ex.eq.trim(),bar:ex.eq.trim()==='Barbell',step:ex.step,kg:ex.kg,reps:ex.reps,sets:ex.sets,custom:true,photo:photo});
  });
  state.session={
    name:typeof saved.session.name==='string'?saved.session.name:defaults.session.name,
    startedAt:Number.isFinite(saved.session.startedAt)?saved.session.startedAt:null,
    ex:saved.session.ex
  };
  state.steps=steps;
  state.workouts=workouts;
  state.hist=hist;
  state.fatigue=fatigue;
  state.customExercises=customExercises;
  state.weeklyPlan=Array.isArray(saved.weeklyPlan)&&saved.weeklyPlan.length===7
    ?saved.weeklyPlan.map(function(key){return key===null||key===''?null:planTemplate(key)?key:null})
    :defaults.weeklyPlan.slice();
  state.favorites=Array.isArray(saved.favorites)?saved.favorites.filter(function(name,index,arr){
    return typeof name==='string'&&arr.indexOf(name)===index&&
      (LIB.some(function(ex){return ex.n===name})||customExercises.some(function(ex){return ex.n===name}));
  }):[];
  state.name=typeof saved.name==='string'?saved.name:'Athlete';
  state.sample=saved.sample===true;
  if(!Number.isFinite(state.age)||state.age<10||state.age>99)state.age=defaults.age;
  if(!Number.isFinite(state.height)||state.height<100||state.height>250)state.height=defaults.height;
  if(!Number.isFinite(state.weight)||state.weight<30||state.weight>300)state.weight=defaults.weight;
  state.water=Number.isFinite(saved.water)?Math.max(0,Math.min(12,saved.water)):0;
  state.goal=Number.isFinite(saved.goal)&&saved.goal>=1000&&saved.goal<=40000?saved.goal:defaults.goal;
  state.exIdx=Number.isInteger(saved.exIdx)?Math.max(0,Math.min(saved.exIdx,state.session.ex.length-1)):0;
  return state;
}
function load(){
  var raw;
  try{raw=localStorage.getItem(KEY)}
  catch(e){storageNotice='Saved data could not be read. Changes may not be saved on this device.';return seed()}
  if(!raw)return seed();
  var saved;
  try{saved=JSON.parse(raw)}
  catch(e){storageNotice='Saved data is unreadable. The app opened with fresh data; check your browser storage before continuing.';return seed()}
  var state=normalizeState(saved);
  if(!state){storageNotice='Saved data has an invalid workout session. The app opened with fresh data.';return seed()}
  if(!Array.isArray(saved.workouts)||!isRecord(saved.steps)||!isRecord(saved.hist))storageNotice='Some saved data was incomplete and has been reset to safe defaults.';
  return state;
}
var S=load();S.hist=S.hist||{};
function save(){
  try{localStorage.setItem(KEY,JSON.stringify(S));storageNotice='';return true}
  catch(e){storageNotice='Changes could not be saved. Check available browser storage.';if(document.getElementById('toast'))toast(storageNotice);return false}
}
if(S.waterDay!==dk(new Date())){S.water=0;S.waterDay=dk(new Date())}

var SBKEY='forge-sidebar';
var sbCollapsed=false;try{sbCollapsed=localStorage.getItem(SBKEY)==='1'}catch(e){}
document.documentElement.classList.toggle('sb-collapsed',sbCollapsed);
var detail=null,tab='home',rest=null,confirmReset=false,libTab='splits',libMuscle='All',libEq='All',libFavoritesOnly=false,showCustomForm=false,openSplit='ppl',pendingLoad=null,preview=null,planWeekOffset=0;
var poseActive=false,poseStream=null,poseLandmarker=null,poseInterval=null,poseStatus='',poseError='',poseOverCount=0,poseCueArmed=true;

/* helpers */
function ring(p,size,stroke,color){
  p=Math.max(0,Math.min(1,p));var r=(size-stroke)/2,c=2*Math.PI*r;
  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" aria-hidden="true"><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" style="stroke:var(--line)" stroke-width="'+stroke+'"/><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" style="stroke:'+color+'" stroke-width="'+stroke+'" stroke-linecap="round" stroke-dasharray="'+(c*p)+' '+c+'" transform="rotate(-90 '+size/2+' '+size/2+')"/></svg>';
}
var CHEV='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
var ICON={
  list:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  train:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9v6M6 6v12M18 6v12M21 9v6M6 12h12"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
  check:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>'
};
var TABS=[['home','Today','home'],['train','Train','train'],['plan','Plan','calendar'],['library','Library','list'],['progress','Progress','chart'],['profile','Profile','user']];

function totals(){
  var tot=0,done=0;S.session.ex.forEach(function(e){e.sets.forEach(function(s){tot++;if(s.done)done++})});
  return{tot:tot,done:done};
}
function todaySteps(){return S.steps[dk(new Date())]||0}
function kcal(){return Math.round(todaySteps()*0.045+totals().done*9)}
function weekStart(){var t=new Date();t.setHours(0,0,0,0);return addDays(t,-((t.getDay()+1)%7))}
function planDayIndex(date){return(date.getDay()+1)%7}
function planTemplate(key){
  if(typeof key!=='string')return null;
  var parts=key.split(':');if(parts.length!==2||!/^\d+$/.test(parts[1]))return null;
  var split=SPLITS.filter(function(item){return item.id===parts[0]})[0],index=Number(parts[1]);
  return split&&Number.isInteger(index)&&index>=0&&split.days[index]&&key===split.id+':'+index?{split:split,day:split.days[index],key:key}:null;
}
function plannedName(key){var item=planTemplate(key);return item?item.day.n+' · '+item.split.short:''}
function completedPlannedWorkout(key,date){
  var name=plannedName(key),dateKey=dk(date);
  return !!name&&S.workouts.some(function(workout){return !workout.sample&&workout.name===name&&dk(new Date(workout.date))===dateKey});
}
function plannedOptions(selected){
  return '<option value="">Rest day</option>'+SPLITS.map(function(split){
    return split.days.map(function(day,index){
      var key=split.id+':'+index;
      return '<option value="'+key+'"'+(key===selected?' selected':'')+'>'+esc(split.name+' · '+day.n)+'</option>';
    }).join('');
  }).join('');
}
function planView(){
  var start=addDays(weekStart(),planWeekOffset*7),today=dk(new Date()),days=[];
  for(var i=0;i<7;i++){
    var date=addDays(start,i),dateKey=dk(date),index=planDayIndex(date),template=planTemplate(S.weeklyPlan[index]),isToday=dateKey===today;
    var done=template&&completedPlannedWorkout(template.key,date);
    days.push('<section class="card plan-day'+(isToday?' plan-today':'')+'"><div class="row between"><div><div class="eyebrow">'+DAYS[index]+'</div><h3>'+date.toLocaleDateString('en-GB',{day:'numeric',month:'short'})+'</h3></div>'+(done?'<span class="plan-status complete">Completed</span>':isToday&&template?'<span class="plan-status">Today</span>':'')+'</div>'+
      '<label class="custom-field plan-select-label">Workout<select class="plan-select" data-plan-day="'+index+'" aria-label="Workout for '+DAYS[index]+'">'+plannedOptions(S.weeklyPlan[index])+'</select></label>'+
      (template?'<p class="muted plan-exercises">'+template.day.x.map(esc).join(' · ')+'</p>':'<p class="muted plan-rest">Recovery day · no workout planned</p>')+
      (isToday?(template?'<button class="pill-btn plan-load" data-act="planload" data-key="'+template.key+'">'+(done?'Train again':'Start today’s workout')+'</button>':'<span class="muted plan-rest-hint">Enjoy your rest day</span>'):'')+
      '</section>');
  }
  var completed=days.filter(function(_,index){var date=addDays(start,index),template=planTemplate(S.weeklyPlan[planDayIndex(date)]);return template&&completedPlannedWorkout(template.key,date)}).length;
  return '<div class="top"><div><div class="eyebrow">Your repeating schedule</div><h1>Weekly plan</h1></div></div>'+
    '<section class="card plan-intro"><div class="row between"><div><h3>Make training a habit</h3><p class="muted">Choose a workout or rest day for each weekday. Your schedule repeats every week.</p></div><span class="chip">'+completed+'/7 done</span></div></section>'+
    '<div class="row between plan-week-nav"><button class="ghost-btn" data-act="planweek" data-d="-1" aria-label="Previous week">← Previous</button><button class="ghost-btn" data-act="planweek" data-d="today">This week</button><button class="ghost-btn" data-act="planweek" data-d="1" aria-label="Next week">Next →</button></div>'+
    '<div class="eyebrow plan-range" aria-live="polite">'+start.toLocaleDateString('en-GB',{day:'numeric',month:'short'})+' – '+addDays(start,6).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})+'</div>'+
    '<div class="plan-days">'+days.join('')+'</div>'+
    '<p class="muted plan-note">Completion is based on finished workouts saved on that date. Your schedule stays on this device and is included in backups.</p>';
}
function fatigueLevels(now){
  var levels={};
  MUSCLES.forEach(function(m){
    var entry=S.fatigue[m[0]],score=entry?Math.max(0,entry.score-Math.max(0,now-Date.parse(entry.updatedAt))/86400000*20):0;
    levels[m[0]]=Math.round(score);
  });
  return levels;
}
function fatigueColor(score){
  return score>=60?'#e6534f':score>=20?'#f0ad48':'#53645a';
}
function fatigueMap(){
  var levels=fatigueLevels(Date.now());
  return ''+
  '<section class="card fatigue-card"><div class="row between"><div><div class="eyebrow">Recovery estimate</div><h3>Muscle heatmap</h3></div><span class="fatigue-live">Today</span></div>'+
  '<div class="heat-figs">'+heatFigure('front',levels)+heatFigure('back',levels)+'</div>'+
  '<div class="heat-legend"><span><i style="background:#53645a"></i>Ready</span><span><i style="background:#f0ad48"></i>Recovering</span><span><i style="background:#e6534f"></i>Rest recommended</span></div>'+
  '<div class="heat-list">'+MUSCLES.map(function(m){
    var score=levels[m[0]],label=score>=60?'Rest recommended':score>=20?'Recovering':'Ready';
    return '<div class="heat-row"><span>'+m[0]+' <small lang="ar" dir="rtl">'+m[1]+'</small></span><b>'+label+'</b><i class="heat-track"><i style="width:'+score+'%;background:'+fatigueColor(score)+'"></i></i></div>';
  }).join('')+'</div>'+
  '<p class="muted heat-note">Estimate only: +20 per completed set, recovers by 20 daily. Not a medical or readiness assessment.</p></section>';
}
function musclesForExercise(ex){
  var targets=[ex.g],n=ex.n.toLowerCase();
  function add(){for(var i=0;i<arguments.length;i++)if(targets.indexOf(arguments[i])<0)targets.push(arguments[i])}
  if(/bench|chest press|pec|fly|dips|push-up/.test(n))add('Chest','Shoulders','Triceps');
  if(/press/.test(n))add('Shoulders','Triceps');
  if(/row|pulldown|pull-up|deadlift/.test(n))add('Back','Biceps');
  if(/deadlift|curl|wrist/.test(n))add('Forearms');
  if(/deadlift|squat|lunge|leg press|leg curl|leg extension|calf|hip thrust/.test(n))add('Legs');
  if(/crunch|plank|sit-up|leg raise|ab wheel|russian twist/.test(n))add('Abs');
  return targets;
}
function recordFatigue(){
  var now=Date.now(),levels=fatigueLevels(now),added=Object.create(null);
  S.session.ex.forEach(function(ex){
    var completed=ex.sets.filter(function(set){return set.done}).length;
    if(!completed)return;
    musclesForExercise(ex).forEach(function(muscle){added[muscle]=(added[muscle]||0)+completed*20});
  });
  Object.keys(added).forEach(function(muscle){
    S.fatigue[muscle]={score:Math.min(100,(levels[muscle]||0)+added[muscle]),updatedAt:new Date(now).toISOString()};
  });
}

/* HOME */
function home(){
  var st=todaySteps(),t=totals(),d=new Date(),todayPlan=planTemplate(S.weeklyPlan[planDayIndex(d)]);
  var ds=d.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'});
  var ini=esc((S.name||'A').trim().charAt(0).toUpperCase()||'A');
  var left=t.tot-t.done;
  return ''+
  '<div class="top"><div><div class="eyebrow">'+ds+'</div><h1>Welcome, '+esc(S.name)+'</h1></div><div class="avatar" aria-hidden="true">'+ini+'</div></div>'+
  fatigueMap()+
  '<section class="card"><div class="row between"><h3>Steps</h3><span class="chip">'+(st>=S.goal?'Goal reached':fmt(Math.max(0,S.goal-st))+' to go')+'</span></div>'+
  '<div class="ring-wrap" style="margin-top:8px">'+ring(st/S.goal,176,14,'var(--blue)')+'<div class="mid"><div class="big num">'+fmt(st)+'</div><div class="muted" style="font-size:13px">of '+fmt(S.goal)+' steps</div></div></div>'+
  '<div class="quick"><button class="ghost-btn" data-act="steps" data-d="500">+500</button><button class="ghost-btn" data-act="steps" data-d="1000">+1,000</button><button class="ghost-btn" data-act="steps" data-d="-500">−500</button></div></section>'+
  '<div class="grid2">'+
  '<section class="card stat"><div class="eyebrow">Calories burnt</div><div class="v num" style="margin-top:6px">'+fmt(kcal())+'</div><div class="u">kcal today</div></section>'+
  '<section class="card stat"><div class="eyebrow">Water</div><div class="v num" style="margin-top:6px">'+S.water+'<span class="u"> / 8 glasses</span></div><div class="mini-ctrl"><button data-act="water" data-d="-1" aria-label="Remove a glass">−</button><button data-act="water" data-d="1" aria-label="Add a glass">+</button></div></section>'+
  '</div>'+
  '<section class="card plan-home"><div class="row between"><div><div class="eyebrow">Weekly plan · today</div><h3>'+(todayPlan?esc(todayPlan.day.n+' · '+todayPlan.split.short):'Rest day')+'</h3></div><button class="ghost-btn" data-act="tab" data-t="plan">Weekly plan</button></div>'+(todayPlan?'<button class="pill-btn" data-act="planload" data-key="'+todayPlan.key+'">Load today’s planned workout</button>':'<p class="muted" style="margin:0">No workout scheduled today. Edit your weekly plan anytime.</p>')+'</section>'+
  '<section class="card today-w"><div><div class="eyebrow">Today\'s workout</div><h2 style="font-size:24px;margin-top:4px">'+esc(sessionName())+'</h2></div>'+
  '<div class="tags"><span class="tag">'+S.session.ex.length+' exercises</span><span class="tag">'+t.tot+' sets</span><span class="tag">'+t.done+' done</span></div>'+
  '<button class="pill-btn" data-act="tab" data-t="train">'+(t.done?'Continue workout':'Start workout')+(left?'':' · all sets done')+'</button><button class="ghost-btn" data-act="tab" data-t="library">Choose another split</button></section>';
}

/* TRAIN */
var PLATES=[[25,110,'#d4372c'],[20,100,'#2a63c9'],[15,88,'#e0b82a'],[10,74,'#2fa35a'],[5,58,'#e9ecea'],[2.5,46,'#9aa5a0'],[1.25,38,'#6f7a75']];
function platesFor(kg){
  var per=Math.max(0,(kg-20)/2),out=[];
  PLATES.forEach(function(p){while(per>=p[0]-0.001){out.push(p);per-=p[0]}});
  return out;
}
function barbell(kg){
  var pl=platesFor(kg),g='',x1=84,x2=276,i;
  for(i=0;i<pl.length;i++){
    var p=pl[i],w=p[0]>=10?13:8,h=p[1];
    g+='<rect x="'+(x1-w)+'" y="'+(75-h/2)+'" width="'+w+'" height="'+h+'" rx="3" fill="'+p[2]+'"/>';
    g+='<rect x="'+x2+'" y="'+(75-h/2)+'" width="'+w+'" height="'+h+'" rx="3" fill="'+p[2]+'"/>';
    x1-=w+2;x2+=w+2;
  }
  return '<svg viewBox="0 0 360 150" role="img" aria-label="Barbell loaded to '+kg+' kilograms"><rect x="10" y="72" width="340" height="6" rx="3" fill="#aab4b0"/><rect x="84" y="66" width="6" height="18" rx="2" fill="#6f7a75"/><rect x="270" y="66" width="6" height="18" rx="2" fill="#6f7a75"/>'+g+'</svg>';
}
function activeIdx(e){for(var i=0;i<e.sets.length;i++){if(!e.sets[i].done)return i}return -1}
function formCoachCard(ex){
  if(ex.n!=='Bench Press')return '';
  return '<section class="card form-coach"><div class="row between"><div><div class="eyebrow">On-device camera coach</div><h3>Bench press form check</h3></div><span class="form-beta">Experimental</span></div>'+
  '<p class="muted coach-help">Place the phone near the foot of the bench at chest height so your torso and one arm stay visible. If estimated upper-arm flare passes 90°, you will get a vibration and the cue “Elbow tucked.”</p>'+
  '<div class="coach-actions"><button class="pill-btn" data-act="pose">'+(poseActive?'Stop camera check':'Start camera check')+'</button></div>'+
  (poseActive?'<video class="pose-video" autoplay muted playsinline aria-label="Live camera preview for bench press form check"></video>':'')+
  '<p id="pose-status" class="coach-status" role="status" aria-live="polite">'+esc(poseError||poseStatus||(poseActive?'Starting camera…':'Camera is off'))+'</p>'+
  '<p class="muted coach-privacy">Video is analyzed on this device and is not recorded or uploaded. The pose model downloads from MediaPipe when first started; camera access requires HTTPS or localhost. This cue is not a substitute for in-person coaching.</p></section>';
}
function angleFromTorso(shoulder,elbow,hip){
  var a={x:hip.x-shoulder.x,y:hip.y-shoulder.y},b={x:elbow.x-shoulder.x,y:elbow.y-shoulder.y};
  var sizeA=Math.hypot(a.x,a.y),sizeB=Math.hypot(b.x,b.y);
  if(!sizeA||!sizeB)return null;
  var cosine=Math.max(-1,Math.min(1,(a.x*b.x+a.y*b.y)/(sizeA*sizeB)));
  return Math.acos(cosine)*180/Math.PI;
}
function benchFlareAngle(landmarks){
  var sides=[[11,13,23],[12,14,24]],angles=[];
  sides.forEach(function(ids){
    var shoulder=landmarks[ids[0]],elbow=landmarks[ids[1]],hip=landmarks[ids[2]];
    if(!shoulder||!elbow||!hip||shoulder.visibility<0.6||elbow.visibility<0.6||hip.visibility<0.6)return;
    var angle=angleFromTorso(shoulder,elbow,hip);
    if(angle!==null)angles.push(angle);
  });
  return angles.length?Math.max.apply(null,angles):null;
}
function syncPoseVideo(){
  if(!poseActive||!poseStream)return;
  var video=document.querySelector('.pose-video');
  if(!video||video.srcObject===poseStream)return;
  video.srcObject=poseStream;
  video.play().catch(function(error){
    poseStatus='Camera preview could not start: '+error.message;
    var status=document.getElementById('pose-status');if(status)status.textContent=poseStatus;
  });
}
function stopPoseCoach(message){
  poseActive=false;poseOverCount=0;poseCueArmed=true;
  if(poseInterval){clearInterval(poseInterval);poseInterval=null}
  if(poseStream){poseStream.getTracks().forEach(function(track){track.stop()});poseStream=null}
  if(poseLandmarker){poseLandmarker.close();poseLandmarker=null}
  poseStatus=message||'Camera is off';
}
async function startPoseCoach(){
  if(!window.isSecureContext){poseError='Camera access requires HTTPS or localhost.';render(true);return}
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){poseError='This browser does not support camera access.';render(true);return}
  poseError='';poseStatus='Requesting camera permission…';poseActive=true;render(true);
  try{
    var stream;
    try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:640},height:{ideal:480}},audio:false})}
    catch(firstError){
      if(firstError.name!=='OverconstrainedError'&&firstError.name!=='NotFoundError')throw firstError;
      stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false});
    }
    if(!poseActive){stream.getTracks().forEach(function(track){track.stop()});return}
    poseStream=stream;syncPoseVideo();
    var video=document.querySelector('.pose-video');
    await video.play();
    poseStatus='Loading the pose model…';render(true);
    var vision=await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.2.0/vision_bundle.mjs');
    if(!poseActive)return;
    var files=await vision.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.2.0/wasm');
    var model='https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';
    try{
      poseLandmarker=await vision.PoseLandmarker.createFromOptions(files,{baseOptions:{modelAssetPath:model,delegate:'GPU'},runningMode:'VIDEO',numPoses:1});
    }catch(gpuError){
      poseLandmarker=await vision.PoseLandmarker.createFromOptions(files,{baseOptions:{modelAssetPath:model,delegate:'CPU'},runningMode:'VIDEO',numPoses:1});
    }
    if(!poseActive){poseLandmarker.close();poseLandmarker=null;return}
    poseStatus='Tracking. Keep your upper body and one arm visible.';
    render(true);
    poseInterval=setInterval(function(){
      var currentVideo=document.querySelector('.pose-video');
      if(!poseActive||!poseLandmarker||!currentVideo||currentVideo.readyState<2)return;
      try{
        var result=poseLandmarker.detectForVideo(currentVideo,Date.now());
        var angle=result.landmarks&&result.landmarks[0]?benchFlareAngle(result.landmarks[0]):null;
        if(angle===null){poseOverCount=0;poseStatus='Body landmarks are unclear. Adjust the camera to show your torso and arm.'}
        else if(angle>90){
          poseOverCount++;
          poseStatus='Possible elbow flare: '+Math.round(angle)+'° · keep the arm closer to your torso.';
          if(poseOverCount>=3&&poseCueArmed){
            poseCueArmed=false;
            if(navigator.vibrate)navigator.vibrate(140);
            if(window.speechSynthesis&&window.SpeechSynthesisUtterance){
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(new window.SpeechSynthesisUtterance('Elbow tucked'));
            }
          }
        }else{
          poseOverCount=0;if(angle<=85)poseCueArmed=true;
          poseStatus='Elbow flare estimate: '+Math.round(angle)+'° · within the 90° cue threshold.';
        }
        var status=document.getElementById('pose-status');if(status)status.textContent=poseStatus;
      }catch(error){
        poseError='Pose tracking stopped: '+error.message;stopPoseCoach(poseError);render(true);
      }
    },300);
  }catch(error){
    poseError='Camera or pose model could not start: '+error.message;
    stopPoseCoach(poseError);render(true);
  }
}
function elapsed(){
  if(!S.session.startedAt)return '0:00';
  var s=Math.floor((Date.now()-S.session.startedAt)/1000);return Math.floor(s/60)+':'+pad(s%60);
}
function train(){
  var e=S.session.ex[S.exIdx],a=activeIdx(e),t=totals();
  var cur=e.sets[a<0?e.sets.length-1:a],kg=cur.kg;
  var stage,im=IMG[e.n],custom=exerciseByName(e.n);
  if(im||(custom&&custom.photo)){
    stage='<div class="stage pic"><img src="'+(im?im.a:esc(custom.photo))+'" alt="'+esc(e.n)+' demonstration"><span class="kgchip num">'+(kg?kg+' kg':'BW')+'</span></div>';
  }else if(e.bar){
    var per=Math.max(0,(kg-20)/2);
    stage='<div class="stage">'+barbell(kg)+'<div class="cap"><b class="num">'+kg+' kg</b><span class="muted" style="font-size:13px">Bar 20 + '+per+' per side</span></div></div>';
  }else{
    stage='<div class="stage"><div class="bigkg num">'+(kg?kg+'<small>kg</small>':'BW<small>+ added weight</small>')+'</div><div class="cap"><b style="font-size:16px">'+esc(e.n)+'</b><span class="muted" style="font-size:13px">per hand or stack</span></div></div>';
  }
  var rows=e.sets.map(function(s,i){
    var isA=i===a;
    return '<div class="set'+(s.done?' done':'')+(isA?' active':'')+'" role="listitem"><span class="idx num">'+(isA?'<i class="dot"></i>':(i+1))+'</span>'+
    '<div class="stepper"><button data-act="kg" data-i="'+i+'" data-d="-1" aria-label="Decrease weight for set '+(i+1)+'">−</button><b class="num">'+(s.kg?s.kg+' kg':'BW')+'</b><button data-act="kg" data-i="'+i+'" data-d="1" aria-label="Increase weight for set '+(i+1)+'">+</button></div>'+
    '<div class="stepper"><button data-act="reps" data-i="'+i+'" data-d="-1" aria-label="Decrease reps for set '+(i+1)+'">−</button><b class="num">'+s.reps+'×</b><button data-act="reps" data-i="'+i+'" data-d="1" aria-label="Increase reps for set '+(i+1)+'">+</button></div>'+
    '<button class="chk" data-act="chk" data-i="'+i+'" aria-label="'+(s.done?'Unmark':'Mark')+' set '+(i+1)+' '+(s.done?'complete':'done')+'" aria-pressed="'+s.done+'">'+ICON.check+'</button></div>';
  }).join('');
  var restHtml='';
  if(rest){
    restHtml='<section class="card rest"><div class="row between"><div><div class="eyebrow">Rest</div><div class="num" id="restT" style="font-family:var(--font-display);font-size:28px;font-weight:700">1:30</div></div><button class="ghost-btn" data-act="skip">Skip</button></div><div class="bar"><i id="restBar"></i></div></section>';
  }
  var pills=S.session.ex.map(function(x,i){
    var all=x.sets.every(function(s){return s.done});
    return '<button class="'+(i===S.exIdx?'on':'')+(all?' fin':'')+'" data-act="ex" data-i="'+i+'" aria-label="'+esc(x.n)+(all?' · complete':'')+'"'+(i===S.exIdx?' aria-current="step"':'')+'>'+(i+1)+'</button>';
  }).join('');
  return ''+
  '<div class="top"><div><div class="eyebrow">'+esc(sessionName())+'</div><button class="h1btn" data-act="detail" data-n="'+esc(e.n)+'" aria-label="Open '+esc(e.n)+' details"><h1>'+esc(e.n)+'</h1></button></div><div class="timer" aria-label="Elapsed time"><i></i><span class="num" id="elapsed">'+elapsed()+'</span></div></div>'+
  formCoachCard(e)+
  '<section class="wk">'+stage+
  '<div class="sets" role="list" aria-label="Exercise sets">'+rows+'</div>'+
  '<div class="exnav"><div class="ring-wrap" style="flex:none">'+ring(t.done/t.tot,52,5,'var(--red)')+'<div class="mid num" style="font-size:12px;font-weight:600">'+t.done+'/'+t.tot+'</div></div><div class="info"><b>'+esc(e.n)+'</b><span>'+esc(e.g)+'</span></div><div class="pills" style="flex:none">'+pills+'</div></div></section>'+
  restHtml+
  '<div class="actions"><button class="ghost-btn" data-act="addset" style="flex:1">+ Add set</button><button class="pill-btn" data-act="finish">Finish workout</button></div>'+
  guide(e.n,true);
}


/* EXERCISE DETAIL */
var CUES={
 'Barbell':['Set the rack height so you can unrack safely, and plant your feet.','Brace your core and keep the bar on a steady path.','Lower under control, then drive up without bouncing.'],
 'EZ bar':['Grip the bar on the angled part and keep your elbows close to your body.','Move only the working joint; do not swing your torso.','Lower slowly and keep tension at the bottom.'],
 'Dumbbell':['Pick a weight you can control through the full range.','Keep your wrist over your elbow and your core tight.','Two seconds down, one up. No swinging.'],
 'Cable':['Set the pulley height for the line of pull you want.','Stand or sit tall and keep tension on the cable the whole rep.','Squeeze at the end of each rep, then return slowly.'],
 'Machine':['Adjust the seat so the joint lines up with the machine pivot.','Push or pull through the full range without locking out hard.','Control the weight back instead of letting the stack drop.'],
 'Plate':['Hold the plate close to your body.','Keep your ribs down and your core tight.','Move slowly and stay in control.'],
 'Bodyweight':['Keep your body in one straight line from head to heel.','Move slowly and breathe out on the effort.','Add reps first, then make it harder.']
};
function histOf(n){return(S.hist&&S.hist[n])||[]}
function lineChart(pts){
  var W=320,H=150,pl=34,pb=24,pt=12,pr=10,i;
  var ys=pts.map(function(p){return p.kg}),lo=Math.min.apply(null,ys),hi=Math.max.apply(null,ys);
  if(hi===lo){hi+=5;lo=Math.max(0,lo-5)}
  var pad=(hi-lo)*.15;hi+=pad;lo=Math.max(0,lo-pad);
  var X=function(k){return pl+(pts.length===1?(W-pl-pr)/2:k*(W-pl-pr)/(pts.length-1))};
  var Y=function(v){return pt+(1-(v-lo)/(hi-lo))*(H-pt-pb)};
  var g='',path='',dots='',lab='';
  for(i=0;i<4;i++){var v=lo+(hi-lo)*i/3,y=Y(v);g+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+y+'" y2="'+y+'" stroke="var(--line)" stroke-dasharray="3 4"/><text x="'+(pl-6)+'" y="'+(y+4)+'" text-anchor="end" font-size="10" fill="var(--muted)">'+(Math.round(v*2)/2)+'</text>'}
  pts.forEach(function(p,k){
    path+=(k?'L':'M')+X(k).toFixed(1)+' '+Y(p.kg).toFixed(1)+' ';
    dots+='<circle cx="'+X(k).toFixed(1)+'" cy="'+Y(p.kg).toFixed(1)+'" r="4.5" fill="var(--panel)" stroke="var(--blue)" stroke-width="2.5"/>';
    var d=new Date(p.d);lab+='<text x="'+X(k).toFixed(1)+'" y="'+(H-6)+'" text-anchor="middle" font-size="10" fill="var(--muted)">'+d.getDate()+'/'+(d.getMonth()+1)+'</text>';
  });
  return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="Top weight per session">'+g+(pts.length>1?'<path d="'+path+'" fill="none" stroke="var(--blue)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>':'')+dots+lab+'</svg>';
}
function detailView(){
  var n=detail,l=exerciseByName(n);
  if(!l){detail=null;return ''}
  var im=IMG[n],photo=l.custom&&l.photo?'<div class="dpic custom-exercise-photo"><img src="'+esc(l.photo)+'" alt="'+esc(n)+'"></div>':'',h=histOf(n),pts=h.slice(-8),best=h.reduce(function(a,p){return Math.max(a,p.kg)},0);
  var last=h.length?h[h.length-1]:null,prev=h.length>1?h[h.length-2]:null;
  var delta=last&&prev?Math.round((last.kg-prev.kg)*100)/100:null;
  var sum=n+' works your '+l.m.toLowerCase()+' using '+(l.eq==='Bodyweight'?'your bodyweight':'a '+l.eq.toLowerCase())+'. A good starting point is '+l.sets+' sets of '+l.reps+(l.kg?' at about '+l.kg+' kg':'')+', then add '+l.step+' kg when every set feels clean.';
  var inTrain=S.session.ex.some(function(e){return e.n===n});
  var prog=h.length
    ?'<div class="dbig"><b class="num">'+best+'<small>kg</small></b><span class="muted">best top weight'+(delta!==null?' · last session '+(delta>0?'+':'')+delta+' kg':'')+'</span></div>'+lineChart(pts)
    :'<p class="muted" style="margin:4px 0 0">No sessions logged yet. Finish a workout with this exercise and your top weight per session is charted here.</p>';
  var hist=h.slice(-5).reverse().map(function(p){var d=new Date(p.d).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});return '<div class="wi"><div class="t"><b class="num">'+p.kg+' kg</b><span>'+d+'</span></div><div class="r num">'+fmt(p.vol)+'<div class="muted" style="font-size:11px;font-weight:400">kg volume</div></div></div>'}).join('');
  return ''+
  '<div class="dtop"><button class="roundbtn" data-act="closedetail" aria-label="Back"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><h1>'+esc(n)+'</h1></div>'+
  (im?'<div class="dpic"><img src="'+im.a+'" alt="'+esc(n)+' demonstration"></div>':photo)+
  '<div class="chips"><span class="chip">'+esc(l.m)+'</span><span class="chip">'+esc(l.eq)+'</span><span class="chip">'+l.sets+' × '+l.reps+'</span>'+(l.custom?'<span class="chip">Custom</span>':'')+'</div>'+
  '<section class="card"><h3 style="margin-bottom:8px">About</h3><p style="margin:0;line-height:1.5">'+esc(sum)+'</p><ol class="cues">'+(Array.isArray(CUES[l.eq])?CUES[l.eq]:CUES.Machine).map(function(c){return '<li>'+c+'</li>'}).join('')+'</ol></section>'+
  (im?'<section class="card guide"><h3>Target muscles</h3><img class="mus" src="'+im.m+'" alt="Muscles worked: front and back"></section>':'')+
  '<section class="card"><h3 style="margin-bottom:8px">My progress</h3>'+prog+'</section>'+
  (hist?'<section class="card"><h3 style="margin-bottom:2px">Recent sessions</h3><div class="wlist">'+hist+'</div></section>':'')+
  '<div class="actions"><button class="ghost-btn favorite-toggle" data-act="favorite" data-n="'+esc(n)+'" aria-pressed="'+isFavorite(n)+'" aria-label="'+(isFavorite(n)?'Remove from':'Add to')+' favorites">'+(isFavorite(n)?'★ Saved':'☆ Favorite')+'</button><button class="pill-btn" data-act="addex" data-n="'+esc(n)+'"'+(inTrain?' disabled':'')+'>'+(inTrain?'In today\'s workout':'+ Add to today\'s workout')+'</button></div>';
}

/* ACHIEVEMENTS */
var BI={
 trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
 flame:'<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
 bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
 steps:'<path d="M4 20h6M14 20h6M7 16c0-4 1-8 3-8s2 4 1 8H7zM13 12c0-4 1-8 3-8s2 4 1 8h-4z"/>',
 drop:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
 star:'<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>'
};
function badges(){
  var real=S.workouts.filter(function(w){return !w.sample}),ws=weekStart();
  var inWeek=real.filter(function(w){return new Date(w.date)>=ws}).length;
  var tot=real.reduce(function(a,w){return a+w.volume},0);
  var today=dk(new Date()),stepBest=S.sample?(S.steps[today]||0):Object.keys(S.steps).reduce(function(a,k){return Math.max(a,S.steps[k])},0);
  var pr=Object.keys(S.hist).some(function(k){var h=S.hist[k];if(h.length<2)return false;var m=0;for(var i=0;i<h.length-1;i++)m=Math.max(m,h[i].kg);return h[h.length-1].kg>m});
  return [
   {n:'First workout',d:'Finish a workout',ic:'trophy',v:real.length,t:1},
   {n:'Three this week',d:'3 workouts in a week',ic:'flame',v:inWeek,t:3},
   {n:'10 tonnes',d:'Lift 10,000 kg in total',ic:'bolt',v:tot,t:10000},
   {n:'Step goal',d:'Reach your daily steps',ic:'steps',v:stepBest,t:S.goal},
   {n:'8 glasses',d:'Drink 8 glasses today',ic:'drop',v:S.water,t:8},
   {n:'New PR',d:'Beat your top weight',ic:'star',v:pr?1:0,t:1}
  ];
}
function achievements(){
  var b=badges(),n=b.filter(function(x){return x.v>=x.t}).length;
  return '<section class="card"><div class="row between"><h3>Achievements</h3><span class="muted num" style="font-size:13px">'+n+' / '+b.length+' unlocked</span></div><div class="badges">'+b.map(function(x){
    var on=x.v>=x.t,p=Math.min(1,x.v/x.t);
    return '<div class="badge'+(on?' on':'')+'"><div class="hex"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+BI[x.ic]+'</svg></div><b>'+x.n+'</b><span>'+(on?'Unlocked':x.d)+'</span><div class="pbar" aria-hidden="true"><i style="width:'+(p*100)+'%"></i></div></div>';
  }).join('')+'</div></section>';
}

/* PROGRESS */
function progress(){
  var ws=weekStart(),today=dk(new Date()),vals=[],i;
  for(i=0;i<7;i++){vals.push(S.steps[dk(addDays(ws,i))]||0)}
  var max=Math.max(S.goal*1.2,Math.max.apply(null,vals)*1.1);
  var past=vals.filter(function(v,k){return dk(addDays(ws,k))<=today&&v>0});
  var avg=past.length?past.reduce(function(a,b){return a+b},0)/past.length:0;
  var cols='',days='';
  for(i=0;i<7;i++){
    var key=dk(addDays(ws,i)),isNow=key===today,fut=key>today,v=vals[i];
    cols+='<div class="col"><div class="bar'+(isNow?' now':'')+(fut?' future':'')+'" style="height:'+(fut?0:v/max*100)+'%">'+(v&&!fut?'<span class="num">'+(v/1000).toFixed(1)+'k</span>':'')+'</div></div>';
    days+='<div class="'+(isNow?'now':'')+'">'+DAYS[i]+'</div>';
  }
  var goalPos=(1-S.goal/max)*100;
  var wk=S.workouts.filter(function(w){return new Date(w.date)>=ws});
  var vol=wk.reduce(function(a,w){return a+w.volume},0);
  var list=S.workouts.slice().sort(function(a,b){return new Date(b.date)-new Date(a.date)}).slice(0,8).map(function(w){
    var d=new Date(w.date).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
    return '<div class="wi"><div class="ic">'+ICON.train.replace('<svg','<svg width="22" height="22"')+'</div><div class="t"><b>'+esc(w.name)+(w.sample?' <span class="chip">Sample</span>':'')+'</b><span>'+d+' · '+w.sets+' sets · '+w.mins+' min</span></div><div class="r num">'+fmt(w.volume)+'<div class="muted" style="font-size:11px;font-weight:400">kg lifted</div></div></div>';
  }).join('')||'<p class="muted" style="margin:6px 0 0">No workouts yet. Finish one on the Train tab and it shows up here.</p>';
  return ''+
  '<div class="top"><div><div class="eyebrow">Week starting Saturday</div><h1>Progress</h1></div></div>'+
  '<section class="card"><div class="row between"><h3>Steps this week</h3><span class="muted num" style="font-size:13px">avg '+fmt(avg)+'</span></div>'+
  '<div class="chart" role="img" aria-label="Daily steps this week"><div class="goal" style="top:calc((100% - 20px) * '+(goalPos/100)+')"><span class="num">goal '+fmt(S.goal)+'</span></div><div class="cols">'+cols+'</div><div class="days">'+days+'</div></div></section>'+
  '<div class="grid2"><section class="card stat"><div class="eyebrow">Workouts</div><div class="v num" style="margin-top:6px">'+wk.length+'</div><div class="u">this week</div></section>'+
  '<section class="card stat"><div class="eyebrow">Volume</div><div class="v num" style="margin-top:6px">'+fmt(vol)+'</div><div class="u">kg lifted this week</div></section></div>'+
  achievements()+
  '<section class="card"><h3 style="margin-bottom:6px">Recent workouts</h3><div class="wlist">'+list+'</div></section>';
}

/* PROFILE */
function profile(){
  var ini=esc((S.name||'A').trim().charAt(0).toUpperCase()||'A');
  return ''+
  '<div class="top"><h1>Profile</h1></div>'+
  '<section class="card"><div class="row" style="margin-bottom:14px"><div class="avatar" style="width:56px;height:56px;font-size:22px">'+ini+'</div><div><h2 style="font-size:22px">'+esc(S.name)+'</h2><span class="muted" style="font-size:13px">Saved on this device</span></div></div>'+
  '<div class="facts"><div class="fact"><b class="num">'+S.age+'</b><span>Age</span></div><div class="fact"><b class="num">'+S.height+'</b><span>Height cm</span></div><div class="fact"><b class="num">'+S.weight+'</b><span>Weight kg</span></div></div></section>'+
  '<section class="card"><h3 style="margin-bottom:6px">Details</h3>'+
  '<div class="field"><label for="f-name">Name</label><input id="f-name" data-f="name" type="text" value="'+esc(S.name)+'" maxlength="24" autocomplete="off"></div>'+
  '<div class="field"><label for="f-age">Age</label><input id="f-age" data-f="age" type="number" inputmode="numeric" min="10" max="99" value="'+S.age+'"></div>'+
  '<div class="field"><label for="f-height">Height (cm)</label><input id="f-height" data-f="height" type="number" inputmode="numeric" min="100" max="250" value="'+S.height+'"></div>'+
  '<div class="field"><label for="f-weight">Weight (kg)</label><input id="f-weight" data-f="weight" type="number" inputmode="decimal" min="30" max="300" step="0.1" value="'+S.weight+'"></div>'+
  '<div class="field"><label for="f-goal">Daily step goal</label><input id="f-goal" data-f="goal" type="number" inputmode="numeric" min="1000" max="40000" step="500" value="'+S.goal+'"></div></section>'+
  '<section class="card"><h3 style="margin-bottom:10px">Data</h3>'+(storageNotice?'<p class="storage-notice" role="alert">'+esc(storageNotice)+'</p>':'')+'<p class="muted data-help">Your workout and profile data stays in this browser. Export a backup before clearing site data or changing devices.</p><div class="row data-actions">'+
  '<button class="ghost-btn" data-act="export">Export backup</button>'+
  '<button class="ghost-btn" data-act="import">Restore backup</button><input id="backup-file" class="visually-hidden" type="file" accept="application/json,.json" aria-label="Choose a Setcount backup file">'+
  (S.sample?'<button class="ghost-btn" data-act="clearsample">Clear sample data</button>':'')+
  '<button class="ghost-btn" data-act="reset">'+(confirmReset?'Tap again to erase everything':'Reset all data')+'</button></div></section>'+
  '<section class="card" aria-labelledby="creator-title"><h3 id="creator-title">About the app</h3>'+
  '<p class="muted attribution-label"><span lang="en">Founder &amp; designer</span> · <span lang="ar" dir="rtl">مؤسس ومصمم التطبيق</span></p>'+
  '<a class="ghost-btn attribution-link" href="https://amressam.is-a.dev/" target="_blank" rel="noopener noreferrer">amressam.is-a.dev</a></section>';
}

/* WORKOUT PREVIEW */
var EQ_ICON={
  Barbell:'<path d="M2 12h20M6 7v10M18 7v10M3.5 9.5v5M20.5 9.5v5"/>',
  'EZ bar':'<path d="M2 12h20M6 7v10M18 7v10M3.5 9.5v5M20.5 9.5v5"/>',
  Dumbbell:'<path d="M8 12h8M6 8v8M18 8v8M3 10v4M21 10v4"/>',
  Cable:'<path d="M6 3v18M6 5h9l3 4v5M18 14v2"/><circle cx="18" cy="18" r="2"/>',
  Machine:'<path d="M5 4h14v4H5zM5 10h14v4H5zM5 16h14v4H5z"/>',
  Bodyweight:'<circle cx="12" cy="5" r="2.5"/><path d="M12 8v7M7 11h10M9.5 21l2.5-6 2.5 6"/>'
};
function eqIcon(eq){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(EQ_ICON[eq]||EQ_ICON.Barbell)+'</svg>'}
function figure(side,ms,heat){
  var f=side==='front';
  function R(k,shape){
    var fill=heat?fatigueColor(ms[k]||0):(ms[k]?'var(--accent)':'#3d4a45');
    return shape.replace('/>',' style="fill:'+fill+'"/>');
  }
  var base='<g style="fill:#2a3531"><circle cx="30" cy="10" r="7"/><rect x="27" y="15" width="6" height="8"/><rect x="14" y="22" width="32" height="44" rx="10"/><rect x="5" y="24" width="8" height="40" rx="4"/><rect x="47" y="24" width="8" height="40" rx="4"/><rect x="18" y="66" width="12" height="50" rx="5"/><rect x="31" y="66" width="12" height="50" rx="5"/></g>';
  var o='';
  o+=R('Shoulders','<circle cx="11" cy="27" r="5"/>')+R('Shoulders','<circle cx="49" cy="27" r="5"/>');
  o+=R('Forearms','<rect x="6" y="47" width="6" height="14" rx="3"/>')+R('Forearms','<rect x="48" y="47" width="6" height="14" rx="3"/>');
  if(f){
    o+=R('Chest','<ellipse cx="23" cy="32" rx="7" ry="5"/>')+R('Chest','<ellipse cx="37" cy="32" rx="7" ry="5"/>');
    o+=R('Abs','<rect x="25" y="41" width="10" height="20" rx="3"/>');
    o+=R('Biceps','<rect x="7" y="33" width="5" height="12" rx="2.5"/>')+R('Biceps','<rect x="48" y="33" width="5" height="12" rx="2.5"/>');
    o+=R('Legs','<rect x="19" y="68" width="10" height="28" rx="4"/>')+R('Legs','<rect x="32" y="68" width="10" height="28" rx="4"/>');
  }else{
    o+=R('Back','<ellipse cx="30" cy="26" rx="10" ry="4"/>')+R('Back','<ellipse cx="22" cy="41" rx="6" ry="11"/>')+R('Back','<ellipse cx="38" cy="41" rx="6" ry="11"/>');
    o+=R('Triceps','<rect x="7" y="33" width="5" height="12" rx="2.5"/>')+R('Triceps','<rect x="48" y="33" width="5" height="12" rx="2.5"/>');
    o+=R('Legs','<rect x="19" y="68" width="10" height="28" rx="4"/>')+R('Legs','<rect x="32" y="68" width="10" height="28" rx="4"/>')+R('Legs','<rect x="20" y="98" width="8" height="16" rx="4"/>')+R('Legs','<rect x="33" y="98" width="8" height="16" rx="4"/>');
  }
  return '<svg viewBox="0 0 60 120" role="img" aria-label="'+side+(heat?' muscle fatigue heatmap':' view of muscles worked')+'">'+base+o+'</svg>';
}
function heatFigure(side,levels){return '<div class="heat-figure">'+figure(side,levels,true)+'<span>'+(side==='front'?'Front':'Back')+'</span></div>'}
function previewView(){
  var sp=SPLITS.filter(function(s){return s.id===preview.id})[0],day=sp.days[preview.i];
  var ex=day.x.map(mkEx).filter(Boolean),tot=0,ms={};
  ex.forEach(function(e){tot+=e.sets.length;ms[e.g]=1});
  var mins=Math.max(5,Math.round(tot*2.9/5)*5);
  var rows=ex.map(function(e){
    var l=LIB.filter(function(x){return x.n===e.n})[0];
    return '<div class="prow"><div class="tile">'+(IMG[e.n]?'<img src="'+IMG[e.n].a+'" alt="">':eqIcon(l.eq))+'</div><div class="t"><b>'+esc(e.n)+'</b><span>'+e.sets.length+' sets · '+l.reps+' reps · '+l.eq+'</span></div></div>';
  }).join('');
  var back='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
  return '<div class="row between"><button class="iconbtn" data-act="back" aria-label="Back to splits">'+back+'</button><span class="eyebrow">'+sp.name+'</span></div>'+
  '<div><h1 style="font-size:34px;line-height:1.1">'+day.n+'</h1><div class="muted" style="margin-top:4px">'+day.m+'</div></div>'+
  '<section class="card pstats"><div><span>Total sets</span><b class="num">'+tot+'</b></div><div><span>Duration</span><b class="num">~'+mins+' min</b></div><div class="figs">'+figure('front',ms)+figure('back',ms)+'</div></section>'+
  '<section aria-label="Exercises">'+rows+'</section><div style="height:76px"></div>'+
  '<div class="startbar"><div><button class="start" data-act="load" data-id="'+sp.id+'" data-i="'+preview.i+'">Start Workout</button></div></div>';
}

/* LIBRARY */
function library(){
  if(preview)return previewView();
  var h='<div class="top"><div><div class="eyebrow">Splits and exercises</div><h1>Library</h1></div></div>'+
  '<div class="seg" role="tablist"><button role="tab" class="'+(libTab==='splits'?'on':'')+'" data-act="libtab" data-t="splits" aria-selected="'+(libTab==='splits')+'">Splits</button><button role="tab" class="'+(libTab==='ex'?'on':'')+'" data-act="libtab" data-t="ex" aria-selected="'+(libTab==='ex')+'">Exercises</button></div>';
  if(libTab==='splits'){
    h+=SPLITS.map(function(sp){
      var open=openSplit===sp.id,body='';
      if(open){
        body='<div class="sp-body"><p class="muted" style="margin:0;font-size:14px">'+sp.note+'</p>'+sp.days.map(function(d,i){
          return '<div class="dayrow"><div class="t"><b>'+d.n+'</b><div class="m">'+d.m+'</div><div class="x">'+d.x.join(', ')+'</div></div><button class="ghost-btn" data-act="preview" data-id="'+sp.id+'" data-i="'+i+'">Open</button></div>';
        }).join('')+'</div>';
      }
      return '<section class="card sp'+(open?' open':'')+'"><button class="sp-head" data-act="split" data-id="'+sp.id+'" aria-expanded="'+open+'"><div><b>'+sp.name+'</b><span class="s">'+sp.freq+' · '+sp.days.length+' workouts</span></div>'+CHEV+'</button>'+body+'</section>';
    }).join('');
  }else{
    var listedExercises=LIB.concat(S.customExercises||[]),groups=libraryMuscles(),equipment=libraryEquipment();
    h+='<div class="mgrid"><button class="mtile all'+(libMuscle==='All'?' on':'')+'" data-act="muscle" data-m="All" aria-pressed="'+(libMuscle==='All')+'"><b>All</b><span>All muscles</span></button>'+groups.map(function(m){
      return '<button class="mtile'+(libMuscle===m[0]?' on':'')+'" data-act="muscle" data-m="'+esc(m[0])+'" aria-pressed="'+(libMuscle===m[0])+'">'+(MIMG[m[0]]?'<img src="'+MIMG[m[0]]+'" alt="">':'<b class="filter-label">'+esc(m[0])+'</b>')+'<span>'+esc(m[0])+(m[1]?' <span lang="ar" dir="rtl">'+m[1]+'</span>':'')+'</span></button>';
    }).join('')+'</div>';
    h+='<div class="eyebrow">Equipment</div><div class="mgrid"><button class="mtile all'+(libEq==='All'?' on':'')+'" data-act="equip" data-e="All" aria-pressed="'+(libEq==='All')+'"><b>All</b><span>Any equipment</span></button>'+equipment.map(function(q){
      return '<button class="mtile'+(libEq===q?' on':'')+'" data-act="equip" data-e="'+esc(q)+'" aria-pressed="'+(libEq===q)+'">'+(EQIMG[q]?'<img src="'+EQIMG[q]+'" alt="">':'<b class="filter-label">'+esc(q)+'</b>')+'<span>'+esc(q)+'</span></button>';
    }).join('')+'</div>';
    h+='<div class="row between library-tools"><div class="seg favorite-filter" role="group" aria-label="Exercise filter"><button class="'+(!libFavoritesOnly?'on':'')+'" data-act="favoritefilter" data-only="false" aria-pressed="'+(!libFavoritesOnly)+'">All exercises</button><button class="'+(libFavoritesOnly?'on':'')+'" data-act="favoritefilter" data-only="true" aria-pressed="'+libFavoritesOnly+'">★ Favorites ('+S.favorites.length+')</button></div><button class="ghost-btn" data-act="showcustom">'+(showCustomForm?'Close':'＋ Add exercise')+'</button></div>';
    if(showCustomForm){
      h+='<form class="card custom-exercise-form" id="custom-exercise-form"><h3>Add anything you train</h3><p class="muted custom-form-help">Name the movement, muscle and equipment however you like — a water bottle, backpack, or homemade setup all work.</p><label class="custom-field">Exercise name<input name="name" type="text" maxlength="48" required autocomplete="off" placeholder="e.g. Water-bottle floor press"></label>'+
      '<div class="custom-form-grid"><label class="custom-field">Muscle / category<input name="muscle" type="text" maxlength="32" list="muscle-suggestions" required placeholder="e.g. Chest, Full body"><datalist id="muscle-suggestions">'+groups.map(function(m){return '<option value="'+esc(m[0])+'">'}).join('')+'<option value="Full body"></datalist></label>'+
      '<label class="custom-field">Equipment / object<input name="equipment" type="text" maxlength="32" list="equipment-suggestions" required placeholder="e.g. Water bottle"><datalist id="equipment-suggestions">'+equipment.map(function(eq){return '<option value="'+esc(eq)+'">'}).join('')+'</datalist></label>'+
      '<label class="custom-field">Starting weight (kg)<input name="weight" type="number" min="0" max="1000" step="0.25" value="0" required></label>'+
      '<label class="custom-field">Weight increment (kg)<input name="step" type="number" min="0.1" max="100" step="0.1" value="2.5" required></label>'+
      '<label class="custom-field">Reps per set<input name="reps" type="number" min="1" max="100" step="1" value="10" required></label>'+
      '<label class="custom-field">Sets<input name="sets" type="number" min="1" max="20" step="1" value="3" required></label></div>'+
      '<label class="custom-field photo-picker">Photo or camera<input name="photo" type="file" accept="image/*" capture="environment"><span class="muted">Optional · compressed and saved only on this device</span></label><img class="custom-photo-preview" id="custom-photo-preview" alt="Selected exercise preview" hidden>'+
      '<button class="pill-btn" type="submit">Save exercise</button></form>';
    }
    var visibleCount=0;
    groups.filter(function(m){return libMuscle==='All'||libMuscle===m[0]}).forEach(function(m){
      var items=listedExercises.filter(function(x){return x.m===m[0]&&(libEq==='All'||x.eq===libEq)&&(!libFavoritesOnly||isFavorite(x.n))});if(!items.length)return;
      visibleCount+=items.length;
      h+='<div class="eyebrow" style="margin-top:6px">'+esc(m[0])+(m[1]?' <span lang="ar" dir="rtl">'+m[1]+'</span>':'')+' · '+items.length+'</div><section class="card" style="padding-block:6px"><div class="wlist">'+
      items.map(function(x){
        var spec=esc(x.eq)+' · '+x.sets+' × '+x.reps+(x.eq==='Bodyweight'?' · bodyweight':' @ '+x.kg+' kg');
        var saved=isFavorite(x.n);
        return '<div class="wi">'+thumb(x.n)+'<button class="t tbtn" data-act="detail" data-n="'+esc(x.n)+'"><b>'+esc(x.n)+(x.custom?' <span class="chip">Custom</span>':'')+'</b><span>'+spec+'</span></button><button class="favorite-icon'+(saved?' saved':'')+'" data-act="favorite" data-n="'+esc(x.n)+'" aria-label="'+(saved?'Remove '+esc(x.n)+' from':'Add '+esc(x.n)+' to')+' favorites" aria-pressed="'+saved+'">'+(saved?'★':'☆')+'</button><button class="ghost-btn" data-act="addex" data-n="'+esc(x.n)+'">+ Add</button></div>';
      }).join('')+'</div></section>';
    });
    if(libFavoritesOnly&&!visibleCount)h+='<section class="card empty-library"><h3>No matching favorites</h3><p class="muted">'+(S.favorites.length?'Try another muscle or equipment filter.':'Tap ☆ next to any exercise to save it here. Favorites stay grouped by muscle and can be filtered by equipment above.')+'</p></section>';
  }
  return h;
}

/* render */

function sidebar(){
  var t=totals(),left=t.tot-t.done;
  var items=TABS.map(function(x){
    var on=tab===x[0]&&!detail,badge=x[0]==='train'&&t.tot>0&&left>0?'<i class="sb-badge num" aria-label="'+left+' sets left">'+left+'</i>':'';
    return '<button class="sb-item'+(on?' on':'')+'" data-act="tab" data-t="'+x[0]+'" title="'+x[1]+'"'+(on?' aria-current="page"':'')+'>'+ICON[x[2]]+'<span class="sb-label-t">'+x[1]+'</span>'+badge+'</button>';
  }).join('');
  var prog=t.tot?t.done/t.tot:0;
  return '<button class="sb-tog" data-act="sbtoggle" aria-label="'+(sbCollapsed?'Expand':'Collapse')+' sidebar" aria-expanded="'+(!sbCollapsed)+'"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>'+
  '<div class="sb-head"><div class="sb-logo" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+BI.flame+'</svg></div><b class="sb-name">Forge Fitness</b></div>'+
  '<div class="sb-cap sb-label-t">Menu</div><div class="sb-list">'+items+'</div>'+
  '<button class="sb-foot" data-act="tab" data-t="train" title="Today\'s workout: '+t.done+' of '+t.tot+' sets"><span class="sb-ring">'+ring(prog,40,5,'var(--blue)')+'<span class="num">'+(t.tot?Math.round(prog*100):0)+'</span></span><span class="sb-label-t"><b>Today\'s workout</b><small class="num">'+t.done+' / '+t.tot+' sets</small></span></button>';
}
function render(keepScroll){
  var v=document.getElementById('view'),y=window.scrollY,focusKey=null;
  if(keepScroll&&v.contains(document.activeElement)){
    var active=document.activeElement;
    if(active.dataset.act)focusKey={act:active.dataset.act,i:active.dataset.i,n:active.dataset.n};
    else if(active.dataset.planDay!==undefined)focusKey={planDay:active.dataset.planDay};
    else if(active.dataset.f)focusKey={field:active.dataset.f};
  }
  v.innerHTML=(detail?detailView():tab==='home'?home():tab==='train'?train():tab==='plan'?planView():tab==='library'?library():tab==='progress'?progress():profile());
  document.getElementById('nav').innerHTML=TABS.map(function(t){
    return '<button class="'+(tab===t[0]?'on':'')+'" data-act="tab" data-t="'+t[0]+'" aria-label="'+t[1]+'"'+(tab===t[0]?' aria-current="page"':'')+'>'+ICON[t[2]]+'<span>'+t[1]+'</span></button>';
  }).join('');
  var sd=document.getElementById('side'),sf=document.activeElement&&sd&&sd.contains(document.activeElement)&&document.activeElement.dataset.t;
  if(sd){sd.innerHTML=sidebar();if(sf){var nb=sd.querySelector('[data-t="'+sf+'"]');if(nb)nb.focus({preventScroll:true})}}
  if(!keepScroll)window.scrollTo(0,0);else window.scrollTo(0,y);
  syncPoseVideo();
  if(focusKey){
    var candidates=v.querySelectorAll(focusKey.planDay!==undefined?'[data-plan-day]':focusKey.field?'[data-f]':'[data-act]'),target=null;
    for(var i=0;i<candidates.length;i++){
      var d=candidates[i].dataset;
      if(focusKey.planDay!==undefined?d.planDay===focusKey.planDay:focusKey.field?d.f===focusKey.field:d.act===focusKey.act&&d.i===focusKey.i&&d.n===focusKey.n){target=candidates[i];break}
    }
    if(target)target.focus({preventScroll:true});
  }
  tick();
}
function toast(msg){
  var t=document.getElementById('toast');t.textContent=msg;t.hidden=false;
  clearTimeout(toast.h);toast.h=setTimeout(function(){t.hidden=true},2200);
}
function tick(){
  var el=document.getElementById('elapsed');if(el)el.textContent=elapsed();
  if(rest){
    var left=Math.max(0,Math.ceil((rest.end-Date.now())/1000));
    if(left<=0){rest=null;render(true);return}
    var rt=document.getElementById('restT'),rb=document.getElementById('restBar');
    if(rt)rt.textContent=Math.floor(left/60)+':'+pad(left%60);
    if(rb)rb.style.width=(left/rest.total*100)+'%';
  }
}
setInterval(tick,1000);

/* actions */
var A={
  sbtoggle:function(){sbCollapsed=!sbCollapsed;document.documentElement.classList.toggle('sb-collapsed',sbCollapsed);try{localStorage.setItem(SBKEY,sbCollapsed?'1':'0')}catch(e){}var b=document.querySelector('.sb-tog');if(b){b.setAttribute('aria-expanded',String(!sbCollapsed));b.setAttribute('aria-label',(sbCollapsed?'Expand':'Collapse')+' sidebar')}},
  detail:function(d){if(poseActive)stopPoseCoach('Camera stopped when opening exercise details.');detail=d.n;render()},
  closedetail:function(){detail=null;render(true)},
  tab:function(d){if(poseActive)stopPoseCoach('Camera stopped when leaving the workout.');detail=null;tab=d.t;confirmReset=false;preview=null;render()},
  planweek:function(d){planWeekOffset=d.d==='today'?0:Math.max(-52,Math.min(52,planWeekOffset+Number(d.d)));render(true)},
  planload:function(d){
    var item=planTemplate(d.key);if(!item){toast('This planned workout is no longer available');return}
    var key='plan:'+item.key;
    if(totals().done>0&&pendingLoad!==key){pendingLoad=key;toast('Your current workout has done sets. Tap Start again to replace it');return}
    var session=mkSession(item.day.n+' · '+item.split.short,item.day.x);
    if(!session.ex.length){toast('This workout has no available exercises');return}
    pendingLoad=null;S.session=session;S.exIdx=0;rest=null;preview=null;tab='train';
    var saved=save();render();if(saved)toast(item.day.n+' loaded · '+totals().tot+' sets');
  },
  preview:function(d){preview={id:d.id,i:Number(d.i)};render()},
  back:function(){preview=null;render()},
  libtab:function(d){libTab=d.t;render(true)},
  equip:function(d){libEq=d.e;render(true)},
  muscle:function(d){libMuscle=d.m;render(true)},
  favoritefilter:function(d){libFavoritesOnly=d.only==='true';render(true)},
  favorite:function(d){
    var before=S.favorites.slice(),index=S.favorites.indexOf(d.n);
    if(index>=0)S.favorites.splice(index,1);else S.favorites.push(d.n);
    if(save())toast(index>=0?'Removed from favorites':'Added to favorites');
    else S.favorites=before;
    render(true);
  },
  showcustom:function(){showCustomForm=!showCustomForm;render(true)},
  split:function(d){openSplit=openSplit===d.id?null:d.id;render(true)},
  load:function(d){
    var key=d.id+':'+d.i;
    if(totals().done>0&&pendingLoad!==key){pendingLoad=key;toast('Your current workout has done sets. Tap Start again to replace it');return}
    pendingLoad=null;
    var sp=SPLITS.filter(function(s){return s.id===d.id})[0],day=sp.days[Number(d.i)];
    S.session=mkSession(day.n+' · '+sp.short,day.x);S.exIdx=0;rest=null;preview=null;var saved=save();tab='train';render();
    if(saved)toast(day.n+' loaded · '+totals().tot+' sets');
  },
  addex:function(d){
    if(S.session.ex.some(function(e){return e.n===d.n})){toast('Already in today\'s workout');return}
    var x=mkEx(d.n);if(!x)return;S.session.ex.push(x);if(save()){toast('Added '+d.n+' to Train');render(true)}
  },
  steps:function(d){var k=dk(new Date());S.steps[k]=Math.max(0,(S.steps[k]||0)+Number(d.d));save();render(true)},
  water:function(d){S.water=Math.max(0,Math.min(12,S.water+Number(d.d)));save();render(true)},
  kg:function(d){var e=S.session.ex[S.exIdx],s=e.sets[d.i];s.kg=Math.max(0,Math.round((s.kg+Number(d.d)*e.step)*100)/100);save();render(true)},
  reps:function(d){var s=S.session.ex[S.exIdx].sets[d.i];s.reps=Math.max(1,s.reps+Number(d.d));save();render(true)},
  chk:function(d){
    var s=S.session.ex[S.exIdx].sets[d.i];s.done=!s.done;
    if(s.done){if(!S.session.startedAt)S.session.startedAt=Date.now();rest={end:Date.now()+90000,total:90}}
    else rest=null;
    save();render(true);
  },
  pose:function(){if(poseActive){poseError='';stopPoseCoach();render(true)}else startPoseCoach()},
  ex:function(d){
    S.exIdx=Number(d.i);
    if(poseActive&&S.session.ex[S.exIdx].n!=='Bench Press')stopPoseCoach('Camera stopped because this exercise is not Bench Press.');
    save();render(true);
  },
  addset:function(){var e=S.session.ex[S.exIdx],l=e.sets[e.sets.length-1];e.sets.push({kg:l.kg,reps:l.reps,done:false});save();render(true)},
  skip:function(){rest=null;render(true)},
  finish:function(){
    var vol=0,sets=0;
    S.session.ex.forEach(function(e){e.sets.forEach(function(s){if(s.done){vol+=s.kg*s.reps;sets++}})});
    if(!sets){toast('Complete at least one set first');return}
    var iso=new Date().toISOString();
    S.session.ex.forEach(function(e){var dn=e.sets.filter(function(s){return s.done});if(!dn.length)return;
      (S.hist[e.n]=S.hist[e.n]||[]).push({d:iso,kg:Math.max.apply(null,dn.map(function(s){return s.kg})),vol:Math.round(dn.reduce(function(a,s){return a+s.kg*s.reps},0))});
      if(S.hist[e.n].length>60)S.hist[e.n].shift()});
    recordFatigue();
    var mins=Math.max(1,Math.round((Date.now()-(S.session.startedAt||Date.now()))/60000));
    S.workouts.push({date:new Date().toISOString(),name:sessionName(),volume:Math.round(vol),sets:sets,mins:mins});
    S.session.ex.forEach(function(e){e.sets.forEach(function(s){s.done=false})});
    S.session.startedAt=null;S.exIdx=0;rest=null;if(poseActive)stopPoseCoach('Camera stopped after the workout.');var saved=save();tab='progress';render();
    toast(saved?'Workout saved · '+fmt(vol)+' kg lifted':'Workout completed but could not be saved · '+fmt(vol)+' kg lifted');
  },
  export:function(){
    try{
      var payload={format:'setcount-backup',version:1,exportedAt:new Date().toISOString(),data:S};
      var blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
      var url=URL.createObjectURL(blob),link=document.createElement('a');
      link.href=url;link.download='forge-backup-'+dk(new Date())+'.json';
      document.body.appendChild(link);link.click();link.remove();
      setTimeout(function(){URL.revokeObjectURL(url)},1000);
      toast('Backup downloaded · keep the file private');
    }catch(e){storageNotice='Backup could not be created. Check browser download permissions.';toast(storageNotice);render(true)}
  },
  import:function(){document.getElementById('backup-file').click()},
  clearsample:function(){
    S.workouts=S.workouts.filter(function(w){return !w.sample});S.steps={};S.sample=false;
    var saved=save();render(true);if(saved)toast('Sample data cleared');
  },
  reset:function(){
    if(!confirmReset){confirmReset=true;render(true);return}
    try{localStorage.removeItem(KEY)}
    catch(e){storageNotice='Data could not be erased from browser storage.';toast(storageNotice);render(true);return}
    if(poseActive)stopPoseCoach('Camera stopped after data reset.');
    S=seed();S.sample=false;S.workouts=[];S.steps={};S.fatigue={};rest=null;confirmReset=false;tab='home';var saved=save();render();
    toast(saved?'All data erased':'Data erased for this session, but the reset could not be saved');
  }
};
function restoreBackup(input){
  var file=input.files&&input.files[0];if(!file)return;
  file.text().then(function(text){
    var payload;
    try{payload=JSON.parse(text)}
    catch(e){toast('This backup file is not valid JSON');return}
    if(!isRecord(payload)||payload.format!=='setcount-backup'||payload.version!==1){toast('This is not a supported Forge Fitness backup');return}
    var restored=normalizeState(payload.data);
    if(!restored){toast('This backup has invalid workout data');return}
    if(!window.confirm('Restore this backup and replace the data saved on this device?'))return;
    if(restored.waterDay!==dk(new Date())){restored.water=0;restored.waterDay=dk(new Date())}
    var previous=S;S=restored;
    if(!save()){S=previous;render(true);return}
    rest=null;tab='home';detail=null;render();toast('Backup restored');
  }).catch(function(){toast('The backup file could not be read')}).then(function(){input.value=''});
}
document.addEventListener('click',function(ev){
  var b=ev.target.closest('[data-act]');if(!b)return;
  var f=A[b.dataset.act];if(f)f(b.dataset);
});
document.addEventListener('change',function(ev){
  if(ev.target.id==='backup-file'){restoreBackup(ev.target);return}
  if(ev.target.dataset&&ev.target.dataset.planDay!==undefined){
    var day=Number(ev.target.dataset.planDay),before=S.weeklyPlan[day],value=ev.target.value||null;
    if(!Number.isInteger(day)||day<0||day>6||(value&&!planTemplate(value))){toast('Choose a valid workout or rest day');render(true);return}
    S.weeklyPlan[day]=value;
    if(!save()){S.weeklyPlan[day]=before;render(true);return}
    render(true);toast(value?'Weekly workout saved':'Rest day saved');return;
  }
  if(ev.target.name==='photo'){
    var file=ev.target.files&&ev.target.files[0],preview=document.getElementById('custom-photo-preview');
    if(!file||!preview)return;
    if(!/^image\//i.test(file.type)||file.size>10*1024*1024){toast('Choose an image smaller than 10 MB');ev.target.value='';return}
    var reader=new FileReader();
    reader.onload=function(){preview.src=reader.result;preview.hidden=false};
    reader.onerror=function(){toast('The photo could not be previewed')};
    reader.readAsDataURL(file);
    return;
  }
  var f=ev.target.dataset&&ev.target.dataset.f;if(!f)return;
  var v=ev.target.value;
  if(f==='name'){S.name=(v.trim()||'Athlete').slice(0,24)}
  else{
    var n=Number(v),min=Number(ev.target.min),max=Number(ev.target.max),step=Number(ev.target.step);
    var stepMismatch=step>0&&Math.abs((n-min)/step-Math.round((n-min)/step))>1e-8;
    if(!v.trim()||!Number.isFinite(n)||n<min||n>max||stepMismatch){
      ev.target.value=S[f];
      toast('Enter a value between '+min+' and '+max+(step>1?' in steps of '+step:''));
      return;
    }
    S[f]=n;
  }
  save();render(true);
});
document.addEventListener('visibilitychange',function(){
  if(document.hidden&&poseActive){stopPoseCoach('Camera stopped while the app was in the background. Start again to resume.');render(true)}
});
document.addEventListener('submit',function(ev){
  if(ev.target.id!=='custom-exercise-form')return;
  ev.preventDefault();
  var form=ev.target;
  if(!form.reportValidity())return;
  var fields=new FormData(form),name=String(fields.get('name')||'').trim(),photoFile=fields.get('photo');
  var exercise={
    n:name,m:String(fields.get('muscle')||'').trim(),eq:String(fields.get('equipment')||'').trim(),
    bar:String(fields.get('equipment')||'').trim()==='Barbell',
    kg:Number(fields.get('weight')),step:Number(fields.get('step')),
    reps:Number(fields.get('reps')),sets:Number(fields.get('sets')),custom:true,photo:''
  };
  var duplicate=LIB.concat(S.customExercises).some(function(existing){return existing.n.toLowerCase()===name.toLowerCase()});
  if(duplicate){toast('An exercise with this name already exists');return}
  if(!name||name.length>48||!exercise.m||exercise.m.length>32||!exercise.eq||exercise.eq.length>32||
    !Number.isFinite(exercise.kg)||exercise.kg<0||exercise.kg>1000||
    !Number.isFinite(exercise.step)||exercise.step<0.1||exercise.step>100||
    !Number.isInteger(exercise.reps)||exercise.reps<1||exercise.reps>100||
    !Number.isInteger(exercise.sets)||exercise.sets<1||exercise.sets>20){
    toast('Check the exercise details and try again');return;
  }
  var saveCustom=function(){
    S.customExercises.push(exercise);
    if(!save()){S.customExercises.pop();return}
    showCustomForm=false;libMuscle=exercise.m;libEq='All';libFavoritesOnly=false;render(true);
    toast(name+' added to your library');
  };
  if(photoFile&&photoFile.size){
    compressExercisePhoto(photoFile).then(function(photo){exercise.photo=photo;saveCustom()}).catch(function(error){toast(error.message||'The photo could not be processed')});
  }else saveCustom();
});
render();
if(storageNotice)toast(storageNotice);
})();
