import { use, useEffect, useState } from "react"
import { AuthContext } from "../../Auth/AuthContext"
import axios from "axios"
import { useParams } from "react-router"
import Swal from 'sweetalert2'
const UpdateCourse = () => {
  const {user} = use(AuthContext)
  const {id} = useParams()
  const [myCourse, setMyCourse] = useState(null)
  const [features, setFeatures] = useState([{
        title: "", description:""
  }])

  useEffect(()=>{
    axios.get(`https://backend-olp.vercel.app/myCourse/${id}`)
      .then(res => {
        setMyCourse(res.data)
        setFeatures(res.data.features || [{ title: "", description: "" }])
      } )
      .catch(err => console.log(err))
  }, [id])

  const addFeature = () => {
    setFeatures([...features, { title: "", description: "" }])
  }

  const removeFeature = (index) => {
    const updated = features.filter((_, i) => i !== index)
    setFeatures(updated)
  }

  const handleFeatureChange = (index, field, value) => {
    const updated = [...features]
    updated[index][field] = value
    setFeatures(updated)
  }


  const handleUpdatete = (e) => {
      e.preventDefault()
      const form = e.target

      const updatedCourse = {
        level: form.level.value,
        category: form.category.value,
        title: form.title.value,
        description: form.description.value,
        lessons: form.lessons.value,
        duration: form.duration.value,
        price: Number(form.price.value),
        oprice: Number(form.oprice.value),
        imageURL: form.imageURL.value,
        rating: myCourse?.rating,
        reviews: myCourse?.reviews,
        students: myCourse?.students,
        features,
        instructor: {
          name: form.InsName.value,
          title: form.InsTitle.value,
          avatar: form.InsAvatar.value,
          email: user?.email
        },
        createdAt: myCourse?.createdAt
      }

      console.log(updatedCourse)

      axios.put(`https://backend-olp.vercel.app/updatedCourse/${id}`, updatedCourse)
        .then(res=> {
          console.log(res.data)
            Swal.fire({
              title: "Update Successfully!",
              text: "The course has been Updated successfully.",
              icon: "success",
              confirmButtonText: "Got it!",
              confirmButtonColor: "#00d9ff",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              color: "#e0e0e0",
              iconColor: "#00d9ff",
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              timer: 3000,
              timerProgressBar: true,
              allowOutsideClick: false,
              allowEscapeKey: true,
              customClass: {
                popup: 'robot-popup'
              },
              didOpen: () => {
                const style = document.createElement('style');
                style.textContent = `
                  .robot-popup {
                    border: 2px solid #00d9ff !important;
                    border-radius: 10px !important;
                    box-shadow: 0 0 15px rgba(0, 217, 255, 0.3) !important;
                  }
                `;
                document.head.appendChild(style);
              }
            });
        })
        .catch(err=> console.log(err))
  }
  return(
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-neutral-950 to-stone-950 flex items-center justify-center p-6 relative mt-20">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-bl from-neutral-800/20 via-transparent to-transparent blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-stone-800/15 via-transparent to-transparent blur-2xl"></div>
        
        {/* Subtle Dots Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Center Glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-175 h-75 bg-neutral-700/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Update Course</h1>
          <p className="text-sm text-gray-500">Fill in the course details below</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleUpdatete}  className="bg-zinc-900 rounded-lg border border-zinc-800 shadow-2xl">
          <div className="p-8 space-y-5">
            {/* Row 1: ID & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Level</label>
                <input
                  defaultValue={myCourse?.level}
                  type="text"
                  className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                  placeholder="1"
                  name="level"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                <input
                  defaultValue={myCourse?.category}
                  type="text"
                  className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                  placeholder="Artificial Intelligence"
                  name="category"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Course Title</label>
              <input
                defaultValue={myCourse?.title}
                type="text"
                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="Advanced Machine Learning & AI Masterclass"
                name="title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
              <textarea
                defaultValue={myCourse?.description}
                rows="3"
                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
                placeholder="Master cutting-edge ML algorithms and deep learning techniques..."
                name="description"
              />
            </div>

            {/* Row 2: Badge & Image */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Lessons(cls)</label>
                <input
                  defaultValue={myCourse?.lessons}
                  type="text"
                  className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                  placeholder="156"
                  name="lessons"
                />
              </div>
            </div>

            {/* Row 3: Duration & Prices */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Duration</label>
                <input
                  defaultValue={myCourse?.duration}
                  type="text"
                  className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                  placeholder="48h"
                  name="duration"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Price</label>
                <input
                  defaultValue={myCourse?.price}
                  type="number"
                  className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                  placeholder="149"
                  name="price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Original Price</label>
                <input
                  defaultValue={myCourse?.oprice}
                  type="number"
                  className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                  placeholder="299"
                  name="oprice"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Course Image URL</label>
              <input
                defaultValue={myCourse?.imageURL}
                type="url"
                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="https://images.unsplash.com/photo..."
                name="imageURL"
              />
            </div>
            
            {/*Course Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-zinc-800"></div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Feature</span>
              <div className="flex-1 h-px bg-zinc-800"></div>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-400">
                  Course Features
                </label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-xs px-3 py-1 bg-black text-white rounded"
                >
                  + Add Feature
                </button>
              </div>

              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 border border-zinc-800 rounded space-y-3"
                >
                  <input
                    type="text"
                    placeholder="Feature Title"
                    value={feature.title}
                    onChange={(e) =>
                      handleFeatureChange(index, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white"
                  />

                  <textarea
                    rows="2"
                    placeholder="Feature Description"
                    value={feature.description}
                    onChange={(e) =>
                      handleFeatureChange(index, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white resize-none"
                  />

                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-xs text-red-400"
                    >
                      Remove Feature
                    </button>
                  )}
                </div>
              ))}
            </div>



            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-zinc-800"></div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructor</span>
              <div className="flex-1 h-px bg-zinc-800"></div>
            </div>

            {/* Instructor Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Name</label>
                <input
                  defaultValue={myCourse?.instructor?.name}
                  type="text"
                  className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                  placeholder="Dr. Sarah Chen"
                  name="InsName"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Title</label>
                <input
                  defaultValue={myCourse?.instructor?.title}
                  type="text"
                  className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                  placeholder="AI Research Lead"
                  name="InsTitle"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Avatar URL</label>
              <input
                defaultValue={myCourse?.instructor?.avatar}
                type="url"
                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="https://i.pravatar.cc/150?img=5"
                name="InsAvatar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-zinc-600 transition-colors"
                name="email"
                value={user?.email}
                readOnly
              />
            </div>
          </div>

          {/* Footer with Button */}
          <div className="px-8 py-5 bg-black/50 border-t border-zinc-800 flex items-center justify-between">
            <p className="text-xs text-gray-500">All fields are required</p>
            <button className="px-6 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-gray-200 transition-colors">
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default UpdateCourse