import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0B0F1A",
  bg2: "#111827",
  card: "#161B26",
  card2: "#1C2333",
  neon: "#39FF88",
  neonDim: "#1a7a40",
  sky: "#87CEFA",
  mint: "#B8FFD6",
  white: "#FFFFFF",
  gray: "#94A3B8",
  grayDark: "#64748B",
  border: "rgba(57,255,136,0.18)",
  borderHover: "rgba(57,255,136,0.4)",
  red: "#FF4D6D",
  yellow: "#FFD700",
  purple: "#A78BFA",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0B0F1A; font-family: 'Space Grotesk', sans-serif; color: #fff; }
  
  .phone-wrap {
    display: flex; justify-content: center; align-items: flex-start;
    padding: 16px 0; min-height: 100vh; background: #06080F;
  }
  .phone {
    width: 390px; height: 844px; background: #0B0F1A;
    border-radius: 44px; border: 2px solid rgba(57,255,136,0.25);
    box-shadow: 0 0 60px rgba(57,255,136,0.08), 0 0 120px rgba(57,255,136,0.04), inset 0 0 30px rgba(0,0,0,0.5);
    overflow: hidden; position: relative; display: flex; flex-direction: column;
  }
  .status-bar {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 28px 8px; font-size: 12px; font-weight: 600;
    color: rgba(255,255,255,0.7); flex-shrink: 0;
  }
  .screen { flex: 1; overflow-y: auto; overflow-x: hidden; scrollbar-width: none; }
  .screen::-webkit-scrollbar { display: none; }
  
  .btn-neon {
    background: linear-gradient(135deg, #39FF88, #00CC66);
    color: #0B0F1A; border: none; border-radius: 14px;
    padding: 14px 28px; font-family: 'Space Grotesk', sans-serif;
    font-size: 15px; font-weight: 700; cursor: pointer;
    width: 100%; letter-spacing: 0.5px;
    box-shadow: 0 4px 20px rgba(57,255,136,0.35);
    transition: all 0.2s;
  }
  .btn-neon:active { transform: scale(0.97); }
  
  .btn-ghost {
    background: rgba(57,255,136,0.08); color: #39FF88;
    border: 1px solid rgba(57,255,136,0.25); border-radius: 14px;
    padding: 13px 28px; font-family: 'Space Grotesk', sans-serif;
    font-size: 15px; font-weight: 600; cursor: pointer; width: 100%;
    transition: all 0.2s;
  }
  .btn-ghost:active { background: rgba(57,255,136,0.15); }
  
  .input-field {
    background: #1C2333; border: 1px solid rgba(57,255,136,0.2);
    border-radius: 14px; padding: 14px 16px; color: #fff;
    font-family: 'Space Grotesk', sans-serif; font-size: 15px;
    width: 100%; outline: none; transition: border 0.2s;
  }
  .input-field:focus { border-color: rgba(57,255,136,0.6); }
  .input-field::placeholder { color: #64748B; }
  
  .card-glass {
    background: #161B26; border: 1px solid rgba(57,255,136,0.12);
    border-radius: 18px; padding: 16px;
  }
  
  .chip {
    display: inline-flex; align-items: center;
    padding: 8px 16px; border-radius: 20px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    border: 1px solid rgba(57,255,136,0.25);
    background: rgba(57,255,136,0.06); color: #39FF88;
    transition: all 0.18s;
  }
  .chip.active {
    background: rgba(57,255,136,0.2);
    border-color: rgba(57,255,136,0.6);
  }
  
  .tab-bar {
    display: flex; border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 12px; gap: 0;
  }
  .tab {
    flex: 1; text-align: center; padding: 10px 4px;
    font-size: 12px; font-weight: 600; color: #64748B;
    cursor: pointer; border-bottom: 2px solid transparent;
    transition: all 0.2s; white-space: nowrap;
  }
  .tab.active { color: #39FF88; border-bottom-color: #39FF88; }
  
  .bottom-nav {
    display: flex; background: #0F1420;
    border-top: 1px solid rgba(57,255,136,0.12);
    padding: 8px 0 16px; flex-shrink: 0;
  }
  .nav-item {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    gap: 4px; cursor: pointer; padding: 4px;
    font-size: 10px; font-weight: 600; color: #64748B; transition: color 0.2s;
  }
  .nav-item.active { color: #39FF88; }
  .nav-item svg { width: 22px; height: 22px; }
  
  .neon-text { color: #39FF88; }
  .sky-text { color: #87CEFA; }
  .gray-text { color: #94A3B8; }
  
  .avatar {
    border-radius: 50%; background: linear-gradient(135deg, #39FF88, #87CEFA);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; color: #0B0F1A; flex-shrink: 0;
  }
  
  .post-card {
    background: #161B26; border: 1px solid rgba(57,255,136,0.1);
    border-radius: 16px; padding: 14px; margin-bottom: 10px;
    transition: border-color 0.2s;
  }
  .post-card:active { border-color: rgba(57,255,136,0.3); }
  
  .vote-btn {
    display: flex; align-items: center; gap: 5px;
    padding: 6px 10px; border-radius: 8px; cursor: pointer;
    font-size: 13px; font-weight: 600; border: none;
    background: rgba(255,255,255,0.05); color: #94A3B8;
    transition: all 0.18s;
  }
  .vote-btn:hover { background: rgba(57,255,136,0.1); color: #39FF88; }
  .vote-btn.active { background: rgba(57,255,136,0.18); color: #39FF88; }

  .msg-bubble {
    max-width: 72%; padding: 10px 14px; border-radius: 16px;
    font-size: 14px; line-height: 1.4; margin-bottom: 6px;
  }
  .msg-out {
    background: linear-gradient(135deg, #39FF88, #00CC66);
    color: #0B0F1A; margin-left: auto; border-bottom-right-radius: 4px;
    align-self: flex-end;
  }
  .msg-in {
    background: #1C2333; color: #fff; border-bottom-left-radius: 4px;
    align-self: flex-start;
  }

  .notif-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #39FF88;
    flex-shrink: 0;
  }

  .badge {
    padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;
  }
  .badge-neon { background: rgba(57,255,136,0.15); color: #39FF88; }
  .badge-sky { background: rgba(135,206,250,0.15); color: #87CEFA; }
  .badge-red { background: rgba(255,77,109,0.15); color: #FF4D6D; }
  .badge-yellow { background: rgba(255,215,0,0.15); color: #FFD700; }
  .badge-purple { background: rgba(167,139,250,0.15); color: #A78BFA; }

  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.05)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(57,255,136,0.3)} 50%{box-shadow:0 0 40px rgba(57,255,136,0.6)} }

  .animate-pulse { animation: pulse 2s infinite; }
  .animate-fadein { animation: fadeIn 0.4s ease forwards; }
  .animate-slideup { animation: slideUp 0.35s ease forwards; }
  .animate-glow { animation: glow 2s infinite; }

  .particle {
    position: absolute; border-radius: 50%;
    background: rgba(57,255,136,0.4); pointer-events: none;
  }

  .otp-box {
    width: 44px; height: 54px; background: #1C2333;
    border: 1.5px solid rgba(57,255,136,0.25); border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; font-weight: 700; color: #39FF88;
    transition: border-color 0.2s;
  }
  .otp-box.filled { border-color: rgba(57,255,136,0.7); background: rgba(57,255,136,0.08); }

  .progress-ring { transform: rotate(-90deg); }

  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: #1C2333; border: 1px solid rgba(57,255,136,0.2);
    border-radius: 14px; padding: 12px 14px;
  }

  .market-card {
    background: #161B26; border: 1px solid rgba(57,255,136,0.1);
    border-radius: 16px; overflow: hidden;
  }
  .market-img {
    height: 120px; background: linear-gradient(135deg, #1C2333, #0F1720);
    display: flex; align-items: center; justify-content: center;
    font-size: 36px;
  }

  .event-card {
    background: #161B26; border: 1px solid rgba(57,255,136,0.1);
    border-radius: 16px; padding: 14px; margin-bottom: 10px;
    border-left: 3px solid #39FF88;
  }

  .stat-box {
    background: #1C2333; border-radius: 12px; padding: 12px 14px; flex: 1;
    text-align: center;
  }

  .admin-card {
    background: #161B26; border: 1px solid rgba(255,77,109,0.2);
    border-radius: 14px; padding: 12px 14px; margin-bottom: 8px;
    display: flex; align-items: center; gap: 12px;
  }

  .create-btn {
    position: fixed; bottom: 80px; right: 24px;
    width: 52px; height: 52px; border-radius: 50%;
    background: linear-gradient(135deg, #39FF88, #00CC66);
    display: flex; align-items: center; justify-content: center;
    border: none; cursor: pointer; font-size: 24px; color: #0B0F1A;
    box-shadow: 0 4px 20px rgba(57,255,136,0.4);
    font-weight: 700;
  }
`;

const MOCK_POSTS = [
  { id:1, user:"Anonymous_231", time:"2m ago", college:"IIT Bombay", title:"Which prof is easiest for DBMS?", body:"Need to choose my elective. Any recommendations?", votes:142, comments:32, tag:"question", emoji:"🤔" },
  { id:2, user:"Shadow_456", time:"15m ago", college:"NIT Trichy", title:"My placement experience at Google 🔥", body:"Finally cracked it after 3 years of grinding. AMA!", votes:891, comments:204, tag:"placement", emoji:"🎉" },
  { id:3, user:"Ghost_789", time:"1h ago", college:"VIT Vellore", title:"Hostel wifi is literally dial-up speeds", body:"Paying 50k/yr for this monstrosity. Rant incoming...", votes:456, comments:87, tag:"rant", emoji:"😤" },
  { id:4, user:"Anon_042", time:"3h ago", college:"BITS Pilani", title:"Best meme of 2024 exam season [OC]", body:null, isImage:true, votes:1203, comments:156, tag:"meme", emoji:"😂" },
];

const MOCK_MESSAGES = [
  { id:1, user:"Anonymous_891", preview:"Did you see the placement stats?", time:"2m", unread:3 },
  { id:2, user:"Shadow_234", preview:"Thanks for the notes! 🙏", time:"1h", unread:0 },
  { id:3, user:"Ghost_567", preview:"Is the hackathon registration open?", time:"3h", unread:1 },
  { id:4, user:"Anon_120", preview:"Same lol, the wifi is terrible", time:"Yesterday", unread:0 },
];

const MOCK_NOTIFS = [
  { id:1, type:"upvote", msg:"Anonymous_789 upvoted your post", sub:"Which prof is easiest for DBMS?", time:"2m", unread:true },
  { id:2, type:"comment", msg:"Shadow_432 commented on your post", sub:'"Try Prof. Sharma, he gives grace marks"', time:"5m", unread:true },
  { id:3, type:"mention", msg:"Ghost_101 mentioned you in a comment", sub:"Placement Megathread 2024", time:"1h", unread:true },
  { id:4, type:"follow", msg:"Anon_567 started following you", sub:null, time:"3h", unread:false },
  { id:5, type:"announce", msg:"🎉 CampusCircle hit 10K members!", sub:"Your college community is growing", time:"1d", unread:false },
];

const INTERESTS = ["Placements","Memes","Coding","Academics","Startup","Sports","Gaming","Music","Photography","Finance","Research","Dance"];

function ParticlesBg() {
  const particles = Array.from({length:12},(_,i)=>({
    id:i, x:Math.random()*100, y:Math.random()*100,
    size:Math.random()*4+2, delay:Math.random()*3,
    duration:Math.random()*4+3,
  }));
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
      {particles.map(p=>(
        <div key={p.id} className="particle" style={{
          left:`${p.x}%`,top:`${p.y}%`,
          width:p.size,height:p.size,
          animation:`pulse ${p.duration}s ${p.delay}s infinite`,
          opacity:0.4,
        }}/>
      ))}
    </div>
  );
}

function StatusBar({screen}) {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <span style={{fontFamily:"Rajdhani",fontWeight:700,fontSize:11,color:"#39FF88",letterSpacing:1}}>
        ●●●●
      </span>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="3" width="3" height="8" rx="1" fill="#39FF88"/><rect x="4" y="2" width="3" height="9" rx="1" fill="#39FF88"/><rect x="8" y="1" width="3" height="10" rx="1" fill="#39FF88"/><rect x="12" y="0" width="3" height="11" rx="1" fill="#39FF88" opacity="0.4"/></svg>
        <svg width="18" height="13" viewBox="0 0 18 13"><path d="M9 3C6 3 3.5 4.5 2 6.7L0 4.7C2 2.2 5.3 0.5 9 0.5s7 1.7 9 4.2L16 6.7C14.5 4.5 12 3 9 3z" fill="#39FF88"/><path d="M9 7.5c-1.5 0-2.8.7-3.7 1.8L3.5 7.5C4.9 5.9 6.8 5 9 5s4.1.9 5.5 2.5L12.7 9.3C11.8 8.2 10.5 7.5 9 7.5z" fill="#39FF88"/><circle cx="9" cy="12" r="1.5" fill="#39FF88"/></svg>
        <svg width="25" height="13" viewBox="0 0 25 13"><rect x="0" y="1" width="22" height="11" rx="3" fill="none" stroke="#39FF88" strokeWidth="1.2"/><rect x="1.5" y="2.5" width="15" height="8" rx="2" fill="#39FF88"/><rect x="22.5" y="4" width="2.5" height="5" rx="1.5" fill="#39FF88" opacity="0.6"/></svg>
      </div>
    </div>
  );
}

function SplashScreen({onNext}) {
  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,position:"relative",background:"linear-gradient(180deg, #0B0F1A 0%, #0F1A2E 100%)"}}>
      <ParticlesBg/>
      <div style={{position:"relative",zIndex:1,width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:24}}>
        <div className="animate-glow" style={{width:100,height:100,borderRadius:28,background:"linear-gradient(135deg, rgba(57,255,136,0.15), rgba(135,206,250,0.1))",border:"2px solid rgba(57,255,136,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span className="animate-pulse" style={{fontSize:44}}>⬡</span>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"Rajdhani",fontSize:38,fontWeight:700,background:"linear-gradient(135deg, #39FF88, #87CEFA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:2,lineHeight:1.1}}>
            CampusCircle
          </div>
          <div style={{color:"#64748B",fontSize:14,marginTop:8,letterSpacing:0.5}}>
            Verified. Anonymous. Connected.
          </div>
        </div>
        <div style={{width:60,height:2,background:"linear-gradient(90deg, transparent, #39FF88, transparent)",borderRadius:2}}/>
        <div style={{textAlign:"center",color:"#94A3B8",fontSize:13,lineHeight:1.6,maxWidth:240}}>
          Join your college community. Stay anonymous. Discover what's really happening on campus.
        </div>
        <div style={{width:"100%",marginTop:16,display:"flex",flexDirection:"column",gap:12}}>
          <button className="btn-neon" onClick={onNext}>Get Started →</button>
          <div style={{textAlign:"center",fontSize:12,color:"#475569"}}>
            🔒 Your identity stays completely private
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({onNext}) {
  const [email,setEmail]=useState("");
  const [verified,setVerified]=useState(false);
  const [sent,setSent]=useState(false);

  const detect = (v)=>{
    setEmail(v);
    if(v.includes("@iitb")||v.includes("@nitk")||v.includes("@vit")||v.includes("@bits")||v.includes("@iit")||v.includes("@nit")||v.includes("@college")||v.includes(".edu")||v.includes(".ac.in")) setVerified(true);
    else setVerified(false);
  };

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"24px 24px 32px",background:"linear-gradient(180deg, #0B0F1A 0%, #111827 100%)"}}>
      <div style={{marginBottom:32,marginTop:8}}>
        <div style={{fontFamily:"Rajdhani",fontSize:28,fontWeight:700,color:"#39FF88",letterSpacing:1}}>Welcome</div>
        <div style={{color:"#64748B",fontSize:14,marginTop:4}}>Sign in with your college email</div>
      </div>

      <div className="card-glass animate-fadein" style={{flex:1,display:"flex",flexDirection:"column",gap:20,padding:24}}>
        <div>
          <div style={{fontSize:12,color:"#64748B",marginBottom:8,fontWeight:600,letterSpacing:0.5}}>COLLEGE EMAIL</div>
          <input className="input-field" placeholder="yourname@college.ac.in"
            value={email} onChange={e=>detect(e.target.value)} type="email"/>
          {verified && (
            <div className="animate-fadein" style={{display:"flex",alignItems:"center",gap:8,marginTop:8,padding:"8px 12px",background:"rgba(57,255,136,0.08)",borderRadius:10,border:"1px solid rgba(57,255,136,0.2)"}}>
              <span style={{color:"#39FF88",fontSize:14}}>✓</span>
              <span style={{color:"#39FF88",fontSize:13,fontWeight:600}}>
                {email.includes("iitb")?"IIT Bombay":email.includes("nitk")?"NIT Karnataka":email.includes("vit")?"VIT Vellore":email.includes("bits")?"BITS Pilani":"College"} Verified
              </span>
            </div>
          )}
        </div>

        <div style={{display:"flex",gap:10}}>
          <button className="btn-neon" style={{flex:2}} onClick={()=>{if(verified)setSent(true)}}>
            {sent?"Resend OTP":"Send OTP"}
          </button>
        </div>

        {sent && (
          <div className="animate-fadein" style={{textAlign:"center",color:"#64748B",fontSize:13}}>
            OTP sent to your email 📧
          </div>
        )}

        <div style={{marginTop:"auto",textAlign:"center",color:"#475569",fontSize:12,lineHeight:1.6}}>
          🔒 Only verified college emails allowed<br/>
          Your identity stays private.
        </div>

        <button className="btn-neon" onClick={onNext} style={{opacity:sent?1:0.5}}>
          Continue →
        </button>
      </div>
    </div>
  );
}

function OTPScreen({onNext}) {
  const [otp,setOtp]=useState(["","","","","",""]);
  const [verifying,setVerifying]=useState(false);
  const [done,setDone]=useState(false);

  const fill=(i,v)=>{
    const n=[...otp];n[i]=v.slice(-1);setOtp(n);
  };

  const verify=()=>{
    setVerifying(true);
    setTimeout(()=>{setVerifying(false);setDone(true);},1500);
    setTimeout(()=>onNext(),2600);
  };

  const filled=otp.filter(Boolean).length;

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:"24px 24px 32px",background:"#0B0F1A"}}>
      <div style={{marginBottom:32,marginTop:8}}>
        <div style={{fontFamily:"Rajdhani",fontSize:28,fontWeight:700,color:"#39FF88",letterSpacing:1}}>Verify OTP</div>
        <div style={{color:"#64748B",fontSize:14,marginTop:4}}>Enter the 6-digit code sent to your email</div>
      </div>

      {done ? (
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(57,255,136,0.15)",border:"2px solid #39FF88",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>
            ✓
          </div>
          <div style={{color:"#39FF88",fontSize:18,fontWeight:700}}>Verified!</div>
          <div style={{color:"#64748B",fontSize:14}}>Redirecting to your campus...</div>
        </div>
      ) : (
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:28}}>
          <div style={{display:"flex",justifyContent:"center",gap:10}}>
            {otp.map((v,i)=>(
              <div key={i} className={`otp-box ${v?"filled":""}`}>
                <input value={v} onChange={e=>fill(i,e.target.value)} maxLength={1}
                  style={{background:"transparent",border:"none",outline:"none",color:"#39FF88",
                    fontSize:22,fontWeight:700,width:24,textAlign:"center",fontFamily:"Space Grotesk"}}/>
              </div>
            ))}
          </div>

          {filled === 6 && (
            <div style={{display:"flex",justifyContent:"center"}}>
              <div style={{width:240,height:4,background:"#1C2333",borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${filled/6*100}%`,background:"linear-gradient(90deg,#39FF88,#87CEFA)",transition:"width 0.3s",borderRadius:2}}/>
              </div>
            </div>
          )}

          <button className="btn-neon" onClick={verify} style={{opacity:filled===6?1:0.4,marginTop:8}}>
            {verifying?"Verifying...":"Verify →"}
          </button>

          <div style={{textAlign:"center"}}>
            <span style={{color:"#64748B",fontSize:13}}>Didn't receive? </span>
            <span style={{color:"#39FF88",fontSize:13,fontWeight:600,cursor:"pointer"}}>Resend OTP</span>
          </div>
        </div>
      )}
    </div>
  );
}

function OnboardingScreen({onNext}) {
  const [year,setYear]=useState("");
  const [branch,setBranch]=useState("");
  const [interests,setInterests]=useState([]);

  const toggleInterest=(i)=>setInterests(p=>p.includes(i)?p.filter(x=>x!==i):[...p,i]);

  return (
    <div style={{height:"100%",overflowY:"auto",padding:"24px 24px 32px",background:"#0B0F1A"}}>
      <div style={{marginBottom:28}}>
        <div style={{fontFamily:"Rajdhani",fontSize:28,fontWeight:700,color:"#39FF88",letterSpacing:1}}>Setup Profile</div>
        <div style={{color:"#64748B",fontSize:14,marginTop:4}}>Tell us a bit about yourself</div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:20}}>
        <div>
          <div style={{fontSize:12,color:"#64748B",marginBottom:8,fontWeight:600,letterSpacing:0.5}}>YEAR OF STUDY</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["1st Year","2nd Year","3rd Year","4th Year","PG"].map(y=>(
              <div key={y} className={`chip ${year===y?"active":""}`} onClick={()=>setYear(y)}>{y}</div>
            ))}
          </div>
        </div>

        <div>
          <div style={{fontSize:12,color:"#64748B",marginBottom:8,fontWeight:600,letterSpacing:0.5}}>BRANCH / COURSE</div>
          <select className="input-field" value={branch} onChange={e=>setBranch(e.target.value)}
            style={{appearance:"none",background:"#1C2333",color:branch?"#fff":"#64748B"}}>
            <option value="">Select your branch</option>
            {["Computer Science","Electrical","Mechanical","Civil","Electronics","Information Technology","MBA","MCA"].map(b=>(
              <option key={b} value={b} style={{background:"#1C2333"}}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <div style={{fontSize:12,color:"#64748B",marginBottom:8,fontWeight:600,letterSpacing:0.5}}>INTERESTS (select all that apply)</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {INTERESTS.map(i=>(
              <div key={i} className={`chip ${interests.includes(i)?"active":""}`} onClick={()=>toggleInterest(i)}>{i}</div>
            ))}
          </div>
        </div>

        <div style={{background:"rgba(57,255,136,0.06)",borderRadius:14,padding:14,border:"1px solid rgba(57,255,136,0.15)",fontSize:13,color:"#94A3B8"}}>
          ⚡ You'll be matched with posts relevant to your interests and college.
        </div>

        <button className="btn-neon" onClick={onNext} style={{marginTop:8,opacity:year&&branch&&interests.length>0?1:0.5}}>
          Continue to Feed →
        </button>
      </div>
    </div>
  );
}

function HomeFeed({setScreen}) {
  const [tab,setTab]=useState("Trending");
  const [votes,setVotes]=useState({});
  const tabs=["Trending","Latest","Following","My College"];
  const tagColors={question:"badge-sky",placement:"badge-neon",rant:"badge-red",meme:"badge-yellow",confession:"badge-purple"};

  const vote=(id,dir)=>setVotes(p=>({...p,[id]:p[id]===dir?null:dir}));

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 16px 0",background:"#0B0F1A",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontFamily:"Rajdhani",fontSize:24,fontWeight:700,color:"#39FF88",letterSpacing:1}}>CampusCircle</div>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <svg viewBox="0 0 24 24" style={{width:22,height:22,fill:"none",stroke:"#94A3B8",strokeWidth:2,cursor:"pointer"}} onClick={()=>setScreen("search")}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <div style={{position:"relative",cursor:"pointer"}} onClick={()=>setScreen("notifs")}>
              <svg viewBox="0 0 24 24" style={{width:22,height:22,fill:"none",stroke:"#94A3B8",strokeWidth:2}}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div style={{position:"absolute",top:-2,right:-2,width:8,height:8,borderRadius:"50%",background:"#39FF88"}}/>
            </div>
            <svg viewBox="0 0 24 24" style={{width:22,height:22,fill:"none",stroke:"#94A3B8",strokeWidth:2,cursor:"pointer"}} onClick={()=>setScreen("messages")}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
        </div>
        <div className="tab-bar">
          {tabs.map(t=><div key={t} className={`tab ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{t}</div>)}
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"8px 12px 80px"}}>
        {MOCK_POSTS.map((p,idx)=>(
          <div key={p.id} className="post-card animate-fadein" style={{animationDelay:`${idx*0.08}s`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div className="avatar" style={{width:36,height:36,fontSize:13}}>{p.user.slice(-2)}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:13,fontWeight:600,color:"#87CEFA"}}>{p.user}</span>
                  <span className={`badge ${tagColors[p.tag]||"badge-sky"}`}>{p.tag}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
                  <span style={{fontSize:11,color:"#64748B"}}>🏛 {p.college}</span>
                  <span style={{fontSize:11,color:"#475569"}}>• {p.time}</span>
                </div>
              </div>
              <svg viewBox="0 0 24 24" style={{width:18,height:18,fill:"none",stroke:"#475569",strokeWidth:2}}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </div>

            <div style={{marginBottom:12}}>
              <div style={{fontSize:15,fontWeight:600,color:"#E2E8F0",marginBottom:6,lineHeight:1.4}}>{p.emoji} {p.title}</div>
              {p.body && <div style={{fontSize:13,color:"#94A3B8",lineHeight:1.5}}>{p.body}</div>}
              {p.isImage && (
                <div style={{height:120,background:"linear-gradient(135deg,#1C2333,#0F2030)",borderRadius:12,marginTop:8,display:"flex",alignItems:"center",justifyContent:"center",border:"1px dashed rgba(57,255,136,0.15)"}}>
                  <div style={{textAlign:"center",color:"#64748B",fontSize:13}}>🖼 Image Post</div>
                </div>
              )}
            </div>

            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <button className={`vote-btn ${votes[p.id]==="up"?"active":""}`} onClick={()=>vote(p.id,"up")}>
                ▲ <span>{p.votes + (votes[p.id]==="up"?1:votes[p.id]==="down"?-1:0)}</span>
              </button>
              <button className={`vote-btn ${votes[p.id]==="down"?"active":""}`} onClick={()=>vote(p.id,"down")} style={{color:votes[p.id]==="down"?"#FF4D6D":"#94A3B8"}}>▼</button>
              <button className="vote-btn" onClick={()=>setScreen("comments")}>
                💬 <span>{p.comments}</span>
              </button>
              <button className="vote-btn" style={{marginLeft:"auto"}}>↗ Share</button>
              <button className="vote-btn">🔖</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreatePost({setScreen}) {
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [cat,setCat]=useState("question");
  const [isPoll,setIsPoll]=useState(false);
  const [opts,setOpts]=useState(["","",""]);
  const cats=["confession","placement","academics","rant","meme","question","poll"];

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 16px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(57,255,136,0.1)",background:"#0B0F1A",flexShrink:0}}>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#94A3B8",fontSize:20,cursor:"pointer"}}>←</button>
        <div style={{fontFamily:"Rajdhani",fontSize:20,fontWeight:700,color:"#39FF88",letterSpacing:1}}>Create Post</div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 24px",display:"flex",flexDirection:"column",gap:16}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {cats.map(c=>(
            <div key={c} className={`chip ${cat===c?"active":""}`} onClick={()=>{setCat(c);setIsPoll(c==="poll")}} style={{fontSize:12}}>
              {c}
            </div>
          ))}
        </div>
        <input className="input-field" placeholder="Title (be specific!)" value={title} onChange={e=>setTitle(e.target.value)}/>
        <textarea className="input-field" placeholder="What's on your mind?" value={body} onChange={e=>setBody(e.target.value)}
          style={{minHeight:100,resize:"none",lineHeight:1.5}}/>
        {isPoll && (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{fontSize:12,color:"#64748B",fontWeight:600,letterSpacing:0.5}}>POLL OPTIONS</div>
            {opts.map((o,i)=>(
              <input key={i} className="input-field" placeholder={`Option ${i+1}`} value={o}
                onChange={e=>{const n=[...opts];n[i]=e.target.value;setOpts(n);}} style={{fontSize:14}}/>
            ))}
            <button className="btn-ghost" onClick={()=>setOpts([...opts,""])} style={{fontSize:13,padding:"10px 16px"}}>+ Add Option</button>
          </div>
        )}
        <div style={{display:"flex",gap:12,padding:12,background:"#1C2333",borderRadius:14,alignItems:"center"}}>
          <div style={{flex:1,fontSize:13,color:"#94A3B8"}}>🖼 Add Image</div>
          <div style={{width:1,height:24,background:"rgba(255,255,255,0.08)"}}/>
          <div style={{flex:1,fontSize:13,color:"#94A3B8",textAlign:"right"}}>👁 Anonymous</div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:8}}>
          <button className="btn-ghost" style={{flex:1,fontSize:14}} onClick={()=>setScreen("home")}>Save Draft</button>
          <button className="btn-neon" style={{flex:2}} onClick={()=>setScreen("home")}>Post →</button>
        </div>
      </div>
    </div>
  );
}

function CommentsPage({setScreen}) {
  const [comment,setComment]=useState("");
  const [reaction,setReaction]=useState(null);

  const comments=[
    {id:1,user:"Shadow_422",time:"1m",text:"Prof. Sharma is the GOAT, confirmed.",votes:34,replies:[
      {id:11,user:"Ghost_091",time:"30s",text:"Agreed! He also drops hints in class 👀",votes:12}
    ]},
    {id:2,user:"Anon_789",time:"5m",text:"Avoid Prof. Kumar at all costs. Trust me bro 💀",votes:67,replies:[]},
    {id:3,user:"Anonymous_234",time:"12m",text:"Depends on your branch honestly, which dept?",votes:18,replies:[]},
  ];

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 16px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(57,255,136,0.1)",background:"#0B0F1A",flexShrink:0}}>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#94A3B8",fontSize:20,cursor:"pointer"}}>←</button>
        <div style={{fontFamily:"Rajdhani",fontSize:20,fontWeight:700,color:"#39FF88"}}>Comments</div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"12px 12px 80px"}}>
        <div className="post-card" style={{marginBottom:16}}>
          <div style={{fontSize:15,fontWeight:600,color:"#E2E8F0",marginBottom:8}}>🤔 Which professor is easiest for DBMS?</div>
          <div style={{fontSize:13,color:"#94A3B8"}}>Need to choose my elective. Any recommendations?</div>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            {["🔥","😂","💀","👍","❤️"].map(e=>(
              <span key={e} onClick={()=>setReaction(e)} style={{fontSize:20,cursor:"pointer",opacity:reaction===e?1:0.5,transition:"opacity 0.2s"}}>{e}</span>
            ))}
          </div>
        </div>

        <div style={{fontSize:12,color:"#64748B",fontWeight:600,letterSpacing:0.5,marginBottom:12}}>32 COMMENTS</div>

        {comments.map(c=>(
          <div key={c.id} style={{marginBottom:12}}>
            <div style={{background:"#161B26",border:"1px solid rgba(57,255,136,0.1)",borderRadius:14,padding:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div className="avatar" style={{width:28,height:28,fontSize:11}}>{c.user.slice(-2)}</div>
                <span style={{fontSize:12,fontWeight:600,color:"#87CEFA"}}>{c.user}</span>
                <span style={{fontSize:11,color:"#475569",marginLeft:"auto"}}>{c.time}</span>
              </div>
              <div style={{fontSize:14,color:"#CBD5E1",lineHeight:1.5}}>{c.text}</div>
              <div style={{display:"flex",gap:8,marginTop:10}}>
                <button className="vote-btn" style={{fontSize:12,padding:"4px 8px"}}>▲ {c.votes}</button>
                <button className="vote-btn" style={{fontSize:12,padding:"4px 8px"}}>💬 Reply</button>
              </div>
            </div>
            {c.replies.map(r=>(
              <div key={r.id} style={{marginLeft:24,marginTop:6,background:"#0F1420",border:"1px solid rgba(57,255,136,0.06)",borderRadius:12,padding:10}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                  <div className="avatar" style={{width:22,height:22,fontSize:9}}>{r.user.slice(-2)}</div>
                  <span style={{fontSize:12,color:"#87CEFA",fontWeight:600}}>{r.user}</span>
                </div>
                <div style={{fontSize:13,color:"#94A3B8"}}>{r.text}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{padding:"10px 12px 20px",background:"#0F1420",borderTop:"1px solid rgba(57,255,136,0.1)",flexShrink:0}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div className="avatar" style={{width:32,height:32,fontSize:12}}>Me</div>
          <div style={{flex:1,display:"flex",gap:8}}>
            <input className="input-field" style={{flex:1,padding:"10px 14px",fontSize:14}}
              placeholder="Add a comment..." value={comment} onChange={e=>setComment(e.target.value)}/>
            <button className="btn-neon" style={{width:44,padding:0,fontSize:18}}>↑</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityPage({setScreen}) {
  const [tab,setTab]=useState("All");
  const tabs=["All","Placements","Memes","Academics","Events","Marketplace"];

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{background:"linear-gradient(180deg,#0F1A2E,#0B0F1A)",padding:"20px 16px 0",flexShrink:0}}>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#94A3B8",fontSize:14,cursor:"pointer",marginBottom:12,display:"flex",alignItems:"center",gap:4}}>← Back</button>
        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:16}}>
          <div style={{width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,#39FF88,#87CEFA)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:700,color:"#0B0F1A"}}>IIT</div>
          <div style={{flex:1}}>
            <div style={{fontSize:18,fontWeight:700,color:"#E2E8F0"}}>IIT Bombay</div>
            <div style={{display:"flex",gap:12,marginTop:4}}>
              <span style={{fontSize:12,color:"#39FF88",fontWeight:600}}>⬡ 12.4K members</span>
              <span style={{fontSize:12,color:"#94A3B8"}}>• 234 online</span>
            </div>
          </div>
          <div style={{padding:"8px 16px",background:"rgba(57,255,136,0.1)",borderRadius:10,border:"1px solid rgba(57,255,136,0.3)",fontSize:12,fontWeight:700,color:"#39FF88"}}>Joined ✓</div>
        </div>
        <div style={{display:"flex",gap:12,marginBottom:16}}>
          <div className="stat-box">
            <div style={{fontSize:11,color:"#64748B",fontWeight:600}}>POSTS</div>
            <div style={{fontSize:18,fontWeight:700,color:"#39FF88"}}>48.2K</div>
          </div>
          <div className="stat-box">
            <div style={{fontSize:11,color:"#64748B",fontWeight:600}}>TRENDING</div>
            <div style={{fontSize:18,fontWeight:700,color:"#87CEFA"}}>#placements</div>
          </div>
          <div className="stat-box">
            <div style={{fontSize:11,color:"#64748B",fontWeight:600}}>ONLINE</div>
            <div style={{fontSize:18,fontWeight:700,color:"#B8FFD6"}}>234</div>
          </div>
        </div>
        <div className="tab-bar" style={{overflowX:"auto",display:"flex",flexWrap:"nowrap",gap:0}}>
          {tabs.map(t=><div key={t} className={`tab ${tab===t?"active":""}`} onClick={()=>setTab(t)} style={{fontSize:11,flexShrink:0}}>{t}</div>)}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 12px 80px"}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12,padding:"8px 12px",background:"rgba(57,255,136,0.06)",borderRadius:12,border:"1px solid rgba(57,255,136,0.15)"}}>
          <span style={{fontSize:12}}>📌</span>
          <span style={{fontSize:13,color:"#39FF88",fontWeight:600}}>Pinned: Placement Season 2024 Megathread</span>
        </div>
        {MOCK_POSTS.slice(0,3).map((p,i)=>(
          <div key={p.id} className="post-card" style={{marginBottom:10}}>
            <div style={{fontSize:14,fontWeight:600,color:"#E2E8F0",marginBottom:6}}>{p.emoji} {p.title}</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button className="vote-btn" style={{fontSize:12}}>▲ {p.votes}</button>
              <button className="vote-btn" style={{fontSize:12}}>💬 {p.comments}</button>
              <span className={`badge ${["badge-neon","badge-sky","badge-yellow"][i%3]}`}>{p.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchPage({setScreen}) {
  const [query,setQuery]=useState("");
  const [tab,setTab]=useState("Posts");
  const tabs=["Posts","Users","Communities","Hashtags"];
  const trending=["#internships","#hostel","#placements","#iit2024","#campuslife"];

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"16px 16px 0",background:"#0B0F1A",flexShrink:0}}>
        <div className="search-bar" style={{marginBottom:12}}>
          <svg viewBox="0 0 24 24" style={{width:18,height:18,fill:"none",stroke:"#64748B",strokeWidth:2,flexShrink:0}}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input style={{background:"none",border:"none",outline:"none",color:"#fff",fontSize:15,flex:1,fontFamily:"Space Grotesk"}}
            placeholder="Search posts, users, topics..." value={query} onChange={e=>setQuery(e.target.value)}/>
        </div>
        <div className="tab-bar">
          {tabs.map(t=><div key={t} className={`tab ${tab===t?"active":""}`} onClick={()=>setTab(t)} style={{fontSize:12}}>{t}</div>)}
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"12px 16px 80px"}}>
        {!query && (
          <>
            <div style={{fontSize:12,color:"#64748B",fontWeight:600,letterSpacing:0.5,marginBottom:12}}>🔥 TRENDING</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:24}}>
              {trending.map(t=>(
                <div key={t} onClick={()=>setQuery(t)} style={{padding:"8px 16px",background:"rgba(135,206,250,0.08)",borderRadius:20,border:"1px solid rgba(135,206,250,0.2)",fontSize:13,color:"#87CEFA",cursor:"pointer",fontWeight:600}}>{t}</div>
              ))}
            </div>
            <div style={{fontSize:12,color:"#64748B",fontWeight:600,letterSpacing:0.5,marginBottom:12}}>RECENT SEARCHES</div>
            {["DBMS professor","Placement season 2024","Hostel wifi"].map(r=>(
              <div key={r} onClick={()=>setQuery(r)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",cursor:"pointer"}}>
                <svg viewBox="0 0 24 24" style={{width:16,height:16,fill:"none",stroke:"#64748B",strokeWidth:2}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span style={{fontSize:14,color:"#94A3B8"}}>{r}</span>
              </div>
            ))}
          </>
        )}
        {query && MOCK_POSTS.filter(p=>p.title.toLowerCase().includes(query.toLowerCase().replace("#",""))||query.startsWith("#")).map(p=>(
          <div key={p.id} className="post-card" style={{marginBottom:10}}>
            <div style={{fontSize:13,fontWeight:600,color:"#87CEFA",marginBottom:4}}>{p.user} • {p.college}</div>
            <div style={{fontSize:14,color:"#E2E8F0",fontWeight:600}}>{p.emoji} {p.title}</div>
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <button className="vote-btn" style={{fontSize:12}}>▲ {p.votes}</button>
              <button className="vote-btn" style={{fontSize:12}}>💬 {p.comments}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesScreen({setScreen}) {
  const [chatOpen,setChatOpen]=useState(null);
  const [msg,setMsg]=useState("");
  const [msgs,setMsgs]=useState([
    {id:1,out:false,text:"Did you see the placement stats this year?",time:"10:32"},
    {id:2,out:true,text:"Yes! 89% placed above 10LPA 🔥",time:"10:33"},
    {id:3,out:false,text:"Which companies came?",time:"10:33"},
    {id:4,out:true,text:"Google, Microsoft, Flipkart, and like 30 more",time:"10:34"},
    {id:5,out:false,text:"That's incredible. Any tips for next year?",time:"10:35"},
  ]);

  if(chatOpen) return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 16px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(57,255,136,0.1)",background:"#0F1420",flexShrink:0}}>
        <button onClick={()=>setChatOpen(null)} style={{background:"none",border:"none",color:"#94A3B8",fontSize:20,cursor:"pointer"}}>←</button>
        <div className="avatar" style={{width:36,height:36,fontSize:13}}>{chatOpen.user.slice(-2)}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:700,color:"#E2E8F0"}}>{chatOpen.user}</div>
          <div style={{fontSize:11,color:"#39FF88"}}>● Online • Anonymous mode</div>
        </div>
        <svg viewBox="0 0 24 24" style={{width:20,height:20,fill:"none",stroke:"#64748B",strokeWidth:2}}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 12px 0",display:"flex",flexDirection:"column",gap:0}}>
        <div style={{textAlign:"center",marginBottom:12}}>
          <span style={{fontSize:11,color:"#475569",background:"#1C2333",padding:"4px 12px",borderRadius:20}}>Today</span>
        </div>
        {msgs.map(m=>(
          <div key={m.id} style={{display:"flex",justifyContent:m.out?"flex-end":"flex-start",marginBottom:8}}>
            {!m.out && <div className="avatar" style={{width:28,height:28,fontSize:10,marginRight:8,alignSelf:"flex-end"}}>{chatOpen.user.slice(-2)}</div>}
            <div>
              <div className={`msg-bubble ${m.out?"msg-out":"msg-in"}`}>{m.text}</div>
              <div style={{fontSize:10,color:"#475569",textAlign:m.out?"right":"left",marginTop:2}}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:"10px 12px 20px",background:"#0F1420",borderTop:"1px solid rgba(57,255,136,0.1)",display:"flex",gap:10,alignItems:"center",flexShrink:0}}>
        <span style={{color:"#64748B",fontSize:20,cursor:"pointer"}}>+</span>
        <input className="input-field" style={{flex:1,padding:"10px 14px",fontSize:14}} placeholder="Message..." value={msg} onChange={e=>setMsg(e.target.value)}/>
        <button className="btn-neon" style={{width:44,padding:0,borderRadius:12,fontSize:18}} onClick={()=>{if(msg.trim()){setMsgs(p=>[...p,{id:p.length+1,out:true,text:msg,time:"Now"}]);setMsg("");}}}>↑</button>
      </div>
    </div>
  );

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 16px 0",background:"#0B0F1A",flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontFamily:"Rajdhani",fontSize:24,fontWeight:700,color:"#39FF88",letterSpacing:1}}>Messages</div>
          <span style={{color:"#39FF88",fontSize:20,cursor:"pointer"}}>✏</span>
        </div>
        <div className="search-bar" style={{marginBottom:12}}>
          <svg viewBox="0 0 24 24" style={{width:16,height:16,fill:"none",stroke:"#64748B",strokeWidth:2,flexShrink:0}}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input style={{background:"none",border:"none",outline:"none",color:"#fff",fontSize:14,flex:1,fontFamily:"Space Grotesk"}} placeholder="Search messages..."/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 12px 80px"}}>
        {MOCK_MESSAGES.map(m=>(
          <div key={m.id} onClick={()=>setChatOpen(m)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 4px",borderBottom:"1px solid rgba(255,255,255,0.04)",cursor:"pointer"}}>
            <div className="avatar" style={{width:46,height:46,fontSize:16}}>{m.user.slice(-2)}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:14,fontWeight:700,color:"#E2E8F0"}}>{m.user}</span>
                <span style={{fontSize:11,color:"#64748B"}}>{m.time}</span>
              </div>
              <div style={{fontSize:13,color:"#94A3B8",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.preview}</div>
            </div>
            {m.unread>0 && <div style={{width:20,height:20,borderRadius:"50%",background:"#39FF88",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#0B0F1A",flexShrink:0}}>{m.unread}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsScreen({setScreen}) {
  const typeIcon={upvote:"▲",comment:"💬",mention:"@",follow:"👤",announce:"📢"};
  const typeBg={upvote:"rgba(57,255,136,0.1)",comment:"rgba(135,206,250,0.1)",mention:"rgba(167,139,250,0.1)",follow:"rgba(255,215,0,0.1)",announce:"rgba(57,255,136,0.15)"};

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 16px",background:"#0B0F1A",flexShrink:0}}>
        <div style={{fontFamily:"Rajdhani",fontSize:24,fontWeight:700,color:"#39FF88",letterSpacing:1}}>Notifications</div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"8px 12px 80px"}}>
        <div style={{fontSize:12,color:"#64748B",fontWeight:600,letterSpacing:0.5,marginBottom:12}}>NEW</div>
        {MOCK_NOTIFS.map(n=>(
          <div key={n.id} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
            <div style={{width:40,height:40,borderRadius:12,background:typeBg[n.type]||"#1C2333",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{typeIcon[n.type]}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,color:"#CBD5E1",lineHeight:1.4,fontWeight:n.unread?600:400}}>{n.msg}</div>
              {n.sub && <div style={{fontSize:12,color:"#64748B",marginTop:4,lineHeight:1.3}}>{n.sub}</div>}
              <div style={{fontSize:11,color:"#475569",marginTop:4}}>{n.time}</div>
            </div>
            {n.unread && <div className="notif-dot" style={{marginTop:8}}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({setScreen}) {
  const badges=[{icon:"🏆",label:"Top Contributor",color:"#FFD700"},{icon:"👑",label:"Meme King",color:"#A78BFA"},{icon:"💼",label:"Placement Guru",color:"#39FF88"}];

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"20px 16px 0",background:"linear-gradient(180deg,#0F1A2E,#0B0F1A)",flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
          <div style={{fontFamily:"Rajdhani",fontSize:24,fontWeight:700,color:"#39FF88",letterSpacing:1}}>My Profile</div>
          <button onClick={()=>setScreen("splash")} style={{background:"none",border:"none",color:"#64748B",fontSize:14,cursor:"pointer"}}>⚙ Settings</button>
        </div>
        <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:20}}>
          <div style={{position:"relative"}}>
            <div className="avatar animate-glow" style={{width:72,height:72,fontSize:24}}>A7</div>
            <div style={{position:"absolute",bottom:0,right:0,width:18,height:18,borderRadius:"50%",background:"#39FF88",border:"2px solid #0B0F1A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>✓</div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:18,fontWeight:700,color:"#E2E8F0"}}>Anonymous_7341</div>
            <div style={{fontSize:13,color:"#64748B",marginTop:2}}>🏛 IIT Bombay • CS 3rd Year</div>
            <div style={{display:"flex",gap:12,marginTop:8}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:700,color:"#39FF88"}}>1.2K</div>
                <div style={{fontSize:10,color:"#64748B"}}>Karma</div>
              </div>
              <div style={{width:1,background:"rgba(255,255,255,0.08)"}}/>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:700,color:"#87CEFA"}}>42</div>
                <div style={{fontSize:10,color:"#64748B"}}>Posts</div>
              </div>
              <div style={{width:1,background:"rgba(255,255,255,0.08)"}}/>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:700,color:"#FFD700"}}>🔥 7</div>
                <div style={{fontSize:10,color:"#64748B"}}>Streak</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto"}}>
          {badges.map(b=>(
            <div key={b.label} style={{padding:"6px 12px",borderRadius:20,border:`1px solid ${b.color}40`,background:`${b.color}10`,fontSize:12,fontWeight:600,color:b.color,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6}}>
              {b.icon} {b.label}
            </div>
          ))}
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"12px 12px 80px"}}>
        {MOCK_POSTS.slice(0,3).map(p=>(
          <div key={p.id} className="post-card" style={{marginBottom:10}}>
            <div style={{fontSize:14,fontWeight:600,color:"#E2E8F0",marginBottom:8}}>{p.emoji} {p.title}</div>
            <div style={{display:"flex",gap:8}}>
              <button className="vote-btn" style={{fontSize:12}}>▲ {p.votes}</button>
              <button className="vote-btn" style={{fontSize:12}}>💬 {p.comments}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketplaceScreen({setScreen}) {
  const items=[
    {id:1,emoji:"📚",title:"GATE CS Books Bundle",price:"₹850",seller:"Anon_234",badge:"Books"},
    {id:2,emoji:"💻",title:"Dell Laptop i5 8th Gen",price:"₹28,000",seller:"Ghost_567",badge:"Electronics"},
    {id:3,emoji:"🪑",title:"Study Chair (adjustable)",price:"₹1,200",seller:"Shadow_891",badge:"Hostel"},
    {id:4,emoji:"🚲",title:"Bicycle - Hero Sprint",price:"₹3,500",seller:"Anon_342",badge:"Bikes"},
  ];

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 16px",background:"#0B0F1A",flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontFamily:"Rajdhani",fontSize:24,fontWeight:700,color:"#39FF88",letterSpacing:1}}>Marketplace</div>
          <button style={{background:"rgba(57,255,136,0.1)",border:"1px solid rgba(57,255,136,0.3)",color:"#39FF88",borderRadius:10,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer"}}>+ Sell</button>
        </div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
          {["All","Books","Electronics","Hostel","Bikes","Other"].map(c=>(
            <div key={c} className="chip" style={{fontSize:12,padding:"6px 14px",whiteSpace:"nowrap"}}>{c}</div>
          ))}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 12px 80px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {items.map(item=>(
            <div key={item.id} className="market-card">
              <div className="market-img">{item.emoji}</div>
              <div style={{padding:"10px 10px 12px"}}>
                <div style={{fontSize:13,fontWeight:700,color:"#E2E8F0",marginBottom:4,lineHeight:1.3}}>{item.title}</div>
                <div style={{fontSize:15,fontWeight:700,color:"#39FF88",marginBottom:6}}>{item.price}</div>
                <div style={{fontSize:11,color:"#64748B",marginBottom:8}}>{item.seller} • 🔒 Anonymous</div>
                <button className="btn-neon" style={{fontSize:12,padding:"8px 14px",borderRadius:10}}>Chat Seller</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventsScreen({setScreen}) {
  const events=[
    {id:1,emoji:"💻",title:"HackBIT 2024",date:"Nov 15-17","org":"Student Council",type:"Hackathon",attending:234},
    {id:2,emoji:"🎭",title:"Mood Indigo – Annual Fest",date:"Dec 20-23",org:"IIT Bombay",type:"Cultural",attending:4800},
    {id:3,emoji:"🤖",title:"AI/ML Workshop",date:"Nov 28",org:"CodeCell",type:"Workshop",attending:87},
    {id:4,emoji:"🎸",title:"Band Night – Open Mic",date:"Nov 30",org:"Music Club",type:"Event",attending:156},
  ];

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 16px",background:"#0B0F1A",flexShrink:0}}>
        <div style={{fontFamily:"Rajdhani",fontSize:24,fontWeight:700,color:"#39FF88",letterSpacing:1,marginBottom:12}}>Events Board</div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
          {["All","Hackathons","Festivals","Workshops","Sports","Club"].map(c=>(
            <div key={c} className="chip" style={{fontSize:12,padding:"6px 14px",whiteSpace:"nowrap"}}>{c}</div>
          ))}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 12px 80px"}}>
        {events.map(e=>(
          <div key={e.id} className="event-card">
            <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{fontSize:28}}>{e.emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:"#E2E8F0",marginBottom:4}}>{e.title}</div>
                <div style={{fontSize:12,color:"#64748B",marginBottom:6}}>📅 {e.date} • 🏛 {e.org}</div>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                  <span className="badge badge-neon">{e.type}</span>
                  <span style={{fontSize:12,color:"#94A3B8"}}>👥 {e.attending} attending</span>
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <button className="btn-ghost" style={{flex:1,fontSize:13,padding:"8px 12px",borderRadius:10}}>Interested</button>
              <button className="btn-neon" style={{flex:1,fontSize:13,padding:"8px 12px",borderRadius:10}}>Attending →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPanel({setScreen}) {
  const reports=[
    {id:1,type:"Post",desc:"Inappropriate content reported",user:"Anon_234",count:8,severity:"high"},
    {id:2,type:"User",desc:"Spam behavior detected",user:"Ghost_567",count:3,severity:"med"},
    {id:3,type:"Post",desc:"Misleading placement info",user:"Shadow_890",count:5,severity:"med"},
  ];

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 16px",background:"#0B0F1A",flexShrink:0}}>
        <button onClick={()=>setScreen("profile")} style={{background:"none",border:"none",color:"#94A3B8",fontSize:14,cursor:"pointer",marginBottom:8,display:"flex",alignItems:"center",gap:4}}>← Back</button>
        <div style={{fontFamily:"Rajdhani",fontSize:24,fontWeight:700,color:"#FF4D6D",letterSpacing:1,marginBottom:4}}>Admin Panel</div>
        <div style={{fontSize:12,color:"#64748B",marginBottom:16}}>🤖 AI Moderation Active</div>
        <div style={{display:"flex",gap:10,marginBottom:16}}>
          <div style={{flex:1,background:"rgba(255,77,109,0.1)",border:"1px solid rgba(255,77,109,0.2)",borderRadius:12,padding:"12px",textAlign:"center"}}>
            <div style={{fontSize:22,fontWeight:700,color:"#FF4D6D"}}>16</div>
            <div style={{fontSize:11,color:"#64748B"}}>Reported</div>
          </div>
          <div style={{flex:1,background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.2)",borderRadius:12,padding:"12px",textAlign:"center"}}>
            <div style={{fontSize:22,fontWeight:700,color:"#FFD700"}}>3</div>
            <div style={{fontSize:11,color:"#64748B"}}>Flagged</div>
          </div>
          <div style={{flex:1,background:"rgba(57,255,136,0.1)",border:"1px solid rgba(57,255,136,0.2)",borderRadius:12,padding:"12px",textAlign:"center"}}>
            <div style={{fontSize:22,fontWeight:700,color:"#39FF88"}}>247</div>
            <div style={{fontSize:11,color:"#64748B"}}>Resolved</div>
          </div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"8px 12px 80px"}}>
        <div style={{fontSize:12,color:"#64748B",fontWeight:600,letterSpacing:0.5,marginBottom:12}}>PENDING REVIEW</div>
        {reports.map(r=>(
          <div key={r.id} className="admin-card">
            <div style={{width:36,height:36,borderRadius:10,background:r.severity==="high"?"rgba(255,77,109,0.15)":"rgba(255,215,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{r.type==="Post"?"📄":"👤"}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:"#E2E8F0",marginBottom:2}}>{r.desc}</div>
              <div style={{fontSize:11,color:"#64748B"}}>{r.user} • {r.count} reports</div>
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <button style={{padding:"4px 12px",borderRadius:8,background:"rgba(255,77,109,0.15)",border:"1px solid rgba(255,77,109,0.3)",color:"#FF4D6D",fontSize:11,fontWeight:700,cursor:"pointer"}}>Remove</button>
                <button style={{padding:"4px 12px",borderRadius:8,background:"rgba(255,215,0,0.1)",border:"1px solid rgba(255,215,0,0.2)",color:"#FFD700",fontSize:11,fontWeight:700,cursor:"pointer"}}>Warn</button>
                <button style={{padding:"4px 12px",borderRadius:8,background:"rgba(57,255,136,0.1)",border:"1px solid rgba(57,255,136,0.2)",color:"#39FF88",fontSize:11,fontWeight:700,cursor:"pointer"}}>Dismiss</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NAV_SCREENS=["home","search","create","messages","profile"];

function BottomNav({screen,setScreen}) {
  if(["splash","login","otp","onboarding"].includes(screen)) return null;

  const items=[
    {id:"home",icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,label:"Home"},
    {id:"search",icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,label:"Search"},
    {id:"create",icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,label:"Create"},
    {id:"messages",icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,label:"Chat"},
    {id:"profile",icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,label:"Me"},
  ];

  return (
    <div className="bottom-nav">
      {items.map(item=>{
        const active = screen===item.id || (item.id==="home" && ["community","comments"].includes(screen));
        return (
          <div key={item.id} className={`nav-item ${active?"active":""}`} onClick={()=>setScreen(item.id)}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function CampusCircle() {
  const [screen,setScreen]=useState("splash");
  const flow={"splash":"login","login":"otp","otp":"onboarding","onboarding":"home"};

  const next=()=>setScreen(s=>flow[s]||s);

  const renderScreen=()=>{
    switch(screen){
      case "splash": return <SplashScreen onNext={next}/>;
      case "login": return <LoginScreen onNext={next}/>;
      case "otp": return <OTPScreen onNext={next}/>;
      case "onboarding": return <OnboardingScreen onNext={next}/>;
      case "home": return <HomeFeed setScreen={setScreen}/>;
      case "create": return <CreatePost setScreen={setScreen}/>;
      case "comments": return <CommentsPage setScreen={setScreen}/>;
      case "community": return <CommunityPage setScreen={setScreen}/>;
      case "search": return <SearchPage setScreen={setScreen}/>;
      case "messages": return <MessagesScreen setScreen={setScreen}/>;
      case "notifs": return <NotificationsScreen setScreen={setScreen}/>;
      case "profile": return <ProfileScreen setScreen={setScreen}/>;
      case "marketplace": return <MarketplaceScreen setScreen={setScreen}/>;
      case "events": return <EventsScreen setScreen={setScreen}/>;
      case "admin": return <AdminPanel setScreen={setScreen}/>;
      default: return <HomeFeed setScreen={setScreen}/>;
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="phone-wrap">
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",maxWidth:420}}>
            {[
              {id:"home",label:"🏠 Feed"},
              {id:"search",label:"🔍 Search"},
              {id:"create",label:"✏ Create"},
              {id:"community",label:"🏛 Community"},
              {id:"messages",label:"💬 Messages"},
              {id:"notifs",label:"🔔 Notifications"},
              {id:"profile",label:"👤 Profile"},
              {id:"marketplace",label:"🛒 Market"},
              {id:"events",label:"📅 Events"},
              {id:"admin",label:"🛡 Admin"},
            ].map(s=>(
              <button key={s.id} onClick={()=>setScreen(s.id)}
                style={{padding:"6px 14px",borderRadius:20,background:screen===s.id?"rgba(57,255,136,0.2)":"rgba(255,255,255,0.05)",
                  border:`1px solid ${screen===s.id?"rgba(57,255,136,0.5)":"rgba(255,255,255,0.1)"}`,
                  color:screen===s.id?"#39FF88":"#94A3B8",fontSize:12,fontWeight:600,cursor:"pointer",
                  fontFamily:"Space Grotesk"}}>
                {s.label}
              </button>
            ))}
          </div>

          <div className="phone">
            <StatusBar screen={screen}/>
            <div className="screen">{renderScreen()}</div>
            <BottomNav screen={screen} setScreen={setScreen}/>
          </div>

          <div style={{textAlign:"center",color:"rgba(57,255,136,0.4)",fontSize:11,fontFamily:"Space Grotesk",fontWeight:600,letterSpacing:1}}>
            CAMPUSCIRCLE • HIGH-FIDELITY PROTOTYPE
          </div>
        </div>
      </div>
    </>
  );
}
