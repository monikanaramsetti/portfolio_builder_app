import React, { useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { portfolioService } from '../services/portfolio';
import { uploadImage } from '../services/api';
import { Plus, Trash2, Loader2, Upload, X, Image as ImageIcon, Link } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with a capital letter')
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  profession: yup
    .string()
    .required('Profession is required')
    .matches(/^[A-Z]/, 'Profession must start with a capital letter')
    .matches(/^[A-Za-z\s]+$/, 'Profession can only contain letters and spaces')
    .min(2, 'Profession must be at least 2 characters')
    .max(50, 'Profession must be less than 50 characters'),
  bio: yup
    .string()
    .required('Bio is required')
    .min(10, 'Bio must be at least 10 characters')
    .max(500, 'Bio must be less than 500 characters'),
  contactInfo: yup
    .string()
    .email('Invalid email format')
    .required('Contact email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address')
    .test('no-numbers-only', 'Email cannot start with only numbers', (value) => {
      if (!value) return true;
      const localPart = value.split('@')[0];
      return !/^\d+$/.test(localPart);
    }),
  profileImage: yup.string().optional(),
  skills: yup.array().of(yup.string().required()).min(1, 'At least one skill is required'),
  socialLinks: yup.array().of(yup.string().url('Invalid URL')).optional(),
  templateStyle: yup.string().oneOf(['modern', 'minimal', 'creative', 'professional', 'elegant', 'bold']).required('Template style is required'),
  projects: yup.array().of(yup.string()).optional(),
});

type FormData = {
  name: string;
  profession: string;
  bio: string;
  contactInfo: string;
  profileImage?: string;
  skills: string[];
  socialLinks: string[];
  templateStyle: TemplateStyle;
  projects?: string[];
};
type TemplateStyle = 'modern' | 'minimal' | 'creative' | 'professional' | 'elegant' | 'bold';

const CreatePortfolio: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname === '/portfolio/edit';

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      skills: [],
      socialLinks: [],
      templateStyle: 'modern',
      profileImage: '',
      projects: [], // <-- Add this line
    },
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills',
  });

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  // Load existing portfolio for edit
  React.useEffect(() => {
    if (isEdit) {
      (async () => {
        setIsLoading(true);
        try {
          const data = await portfolioService.getMyPortfolio();
          reset({
            name: data.name,
            profession: data.profession,
            bio: data.bio,
            contactInfo: data.contactInfo,
            profileImage: data.profileImage || '',
            skills: data.skills || [],
            socialLinks: data.socialLinks || [],
            templateStyle: data.templateStyle as TemplateStyle,
          });
          if (data.profileImage) setPreviewUrl(data.profileImage);
        } catch (e) {
          toast.error('Failed to load portfolio for editing');
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [isEdit, reset]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      try {
        const imageUrl = await uploadImage(file);
        setValue('profileImage', imageUrl);
      } catch (err) {
        toast.error('Image upload failed');
        setValue('profileImage', '');
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setValue('profileImage', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const portfolioData: FormData = {
        ...data,
        skills: (data.skills || []).filter((skill) => !!skill && typeof skill === 'string' && skill.trim() !== ''),
        socialLinks: (data.socialLinks || []).filter((link) => !!link && typeof link === 'string' && link.trim() !== ''),
        projects: data.projects || [], // <-- Ensure projects is always present
      };
      if (isEdit) {
        await portfolioService.updateMyPortfolio(portfolioData);
        toast.success('Portfolio updated successfully!');
      } else {
        await portfolioService.createPortfolio(portfolioData);
        toast.success('Portfolio created successfully!');
      }
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup function for preview URL
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const templateOptions = [
    { value: 'modern', label: 'Modern', color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
    { value: 'minimal', label: 'Minimal', color: 'bg-gradient-to-br from-gray-200 to-gray-400' },
    { value: 'creative', label: 'Creative', color: 'bg-gradient-to-br from-pink-400 to-pink-600' },
    { value: 'professional', label: 'Professional', color: 'bg-gradient-to-br from-emerald-400 to-emerald-600' },
    { value: 'elegant', label: 'Elegant', color: 'bg-gradient-to-br from-purple-400 to-purple-600' },
    { value: 'bold', label: 'Bold', color: 'bg-gradient-to-br from-yellow-400 to-yellow-600' },
  ];
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>('modern');

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700">
          <div className="p-8 border-b border-slate-700">
            <h1 className="text-3xl font-bold text-white mb-2">{isEdit ? 'Edit Your Portfolio' : 'Create Your Portfolio'}</h1>
            <p className="text-slate-200 text-lg">Fill in the details to create your professional portfolio</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Full Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="form-input w-full px-4 py-3 bg-white border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Profession
                </label>
                <input
                  {...register('profession')}
                  type="text"
                  className="form-input w-full px-4 py-3 bg-white border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                  placeholder="Full Stack Developer"
                />
                {errors.profession && <p className="mt-1 text-sm text-red-400">{errors.profession.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Bio
              </label>
              <textarea
                {...register('bio')}
                rows={4}
                className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-900 text-white placeholder-slate-400"
                placeholder="Tell us about yourself..."
              />
              {errors.bio && <p className="mt-1 text-sm text-red-400">{errors.bio.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Contact Email
                </label>
                <input
                  {...register('contactInfo')}
                  type="email"
                  className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-900 text-white placeholder-slate-400"
                  placeholder="john@example.com"
                />
                {errors.contactInfo && <p className="mt-1 text-sm text-red-400">{errors.contactInfo.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Profile Photo <span className="text-blue-400">*</span>
                </label>
                <div className="space-y-4">
                  {/* File Upload Area */}
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    {!previewUrl ? (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors bg-slate-900 hover:bg-slate-800 group"
                      >
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-dashed border-slate-500 flex items-center justify-center group-hover:border-blue-400 transition-colors">
                          <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <p className="text-slate-300 font-medium mb-1">Upload Your Profile Photo</p>
                        <p className="text-slate-400 text-sm">Click to select an image file</p>
                        <p className="text-slate-500 text-xs mt-2">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    ) : (
                      <div className="relative group">
                        <img
                          src={previewUrl}
                          alt="Profile preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-slate-600"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-2"
                          >
                            Change Photo
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Upload Status */}
                  {selectedFile && (
                    <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Photo uploaded successfully!</span>
                    </div>
                  )}
                  
                  {/* URL Input as Fallback */}
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Or enter image URL (Alternative)
                    </label>
                    <input
                      {...register('profileImage')}
                      type="url"
                      className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-900 text-white placeholder-slate-400"
                      placeholder="https://example.com/your-photo.jpg"
                      disabled={!!selectedFile}
                    />
                    <p className="text-slate-400 text-xs mt-1">
                      {selectedFile ? 'URL input disabled when file is uploaded' : 'Use this if you prefer to use an online image URL'}
                    </p>
                  </div>
                </div>
                {errors.profileImage && <p className="mt-1 text-sm text-red-400">{errors.profileImage.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Skills
              </label>
              <div className="space-y-2">
                {skillFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input
                      {...register(`skills.${index}` as const)}
                      type="text"
                      className="flex-1 px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-900 text-white placeholder-slate-400"
                      placeholder="JavaScript, React, Node.js..."
                    />
                    {skillFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="px-3 py-3 text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendSkill('')}
                  className="flex items-center text-blue-400 hover:text-blue-200 text-sm font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Skill
                </button>
              </div>
              {errors.skills && <p className="mt-1 text-sm text-red-400">{errors.skills.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Social Links (Optional)
              </label>
              <div className="space-y-2">
                {socialFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        {...register(`socialLinks.${index}` as const)}
                        type="url"
                        className="w-full px-4 py-3 pl-10 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-900 text-white placeholder-slate-400"
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Link className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSocial(index)}
                      className="px-3 py-3 text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendSocial('')}
                  className="flex items-center text-blue-400 hover:text-blue-200 text-sm font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Social Link
                </button>
              </div>
              {errors.socialLinks && <p className="mt-1 text-sm text-red-400">{errors.socialLinks.message}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-200 mb-2">Choose a Template</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {templateOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-lg p-4 flex flex-col items-center border-2 transition-all ${selectedTemplate === option.value ? 'border-blue-500 ring-2 ring-blue-400' : 'border-transparent'}`}
                    onClick={() => {
                      setSelectedTemplate(option.value as TemplateStyle);
                      setValue('templateStyle', option.value as TemplateStyle);
                    }}
                  >
                    <div className={`w-20 h-12 mb-2 rounded ${option.color}`}></div>
                    <span className="font-semibold text-white">{option.label}</span>
                    {selectedTemplate === option.value && <span className="mt-1 text-xs text-blue-300">Selected</span>}
                    <input
                      type="radio"
                      value={option.value}
                      {...register('templateStyle')}
                      checked={selectedTemplate === option.value}
                      onChange={() => {
                        setSelectedTemplate(option.value as TemplateStyle);
                        setValue('templateStyle', option.value as TemplateStyle);
                      }}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
              {errors.templateStyle && <p className="mt-1 text-sm text-red-400">{errors.templateStyle.message}</p>}
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 border border-slate-600 text-slate-200 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  'Create Portfolio'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolio;