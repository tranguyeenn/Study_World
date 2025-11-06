import React, { useState } from "react";
import supabase from "/src/utils/supabaseClient.js";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!email) errs.email = "email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "enter a valid email";
    if (!password) errs.password = "password is required";
    else if (password.length < 6)
      errs.password = "password must be at least 6 characters";
    if (password !== confirm) errs.confirm = "passwords do not match";
    return errs;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // Create initial row in "users" table
    try {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          name: email.split("@")[0],
          xp: 0,
          coins: 0,
          level: 1,
          created_at: new Date(),
        },
      ]);
      if (insertError) console.error("User row insert error:", insertError.message);
    } catch (err) {
      console.error("Unexpected insert error:", err);
    }

    alert("Account created! You can now log in.");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1128] via-[#0d1b3a] to-[#0a1128] text-[#d0e1ff] font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(62,125,255,0.12),_transparent_70%)] pointer-events-none" />

      <div className="relative bg-[#1d2d50]/50 border border-[#233a6e] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-md w-[90%] max-w-md p-8">
        <h1 className="text-3xl font-semibold text-center text-[#9ecbff] mb-8 text-glow">
          create your account
        </h1>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* email */}
          <div>
            <label className="block text-sm mb-1 text-[#b8cfff]/80">email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 rounded-md bg-[#0a1128]/60 border ${
                errors.email ? "border-red-400" : "border-[#233a6e]"
              } focus:border-[#9ecbff] focus:outline-none text-[#d0e1ff] transition`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* password */}
          <div>
            <label className="block text-sm mb-1 text-[#b8cfff]/80">password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-4 py-2 rounded-md bg-[#0a1128]/60 border ${
                errors.password ? "border-red-400" : "border-[#233a6e]"
              } focus:border-[#9ecbff] focus:outline-none text-[#d0e1ff] transition`}
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* confirm password */}
          <div>
            <label className="block text-sm mb-1 text-[#b8cfff]/80">confirm password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-4 py-2 rounded-md bg-[#0a1128]/60 border ${
                errors.confirm ? "border-red-400" : "border-[#233a6e]"
              } focus:border-[#9ecbff] focus:outline-none text-[#d0e1ff] transition`}
            />
            {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>}
          </div>

          {/* submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#1d2d50]/70 border border-[#233a6e] text-[#d0e1ff] rounded-md py-2 font-medium hover:bg-[#233a6e]/80 hover:text-[#9ecbff] transition shadow-[0_0_15px_rgba(62,125,255,0.3)]"
          >
            {loading ? "signing up..." : "sign up"}
          </button>

          {/* helper link */}
          <div className="text-center text-xs mt-4 text-[#9ecbff]/70">
            already have an account?{" "}
            <a href="/login" className="hover:text-[#9ecbff]">
              sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
