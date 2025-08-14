import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService } from '../services/projects';
import { Plus, Trash2, Loader2, Link, Image } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .matches(/^[A-Z]/, 'Title must start with a capital letter')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  techStack: yup
    .array()
    .of(
      yup
        .string()
        .required('Technology is required')
        .matches(/^[A-Za-z+#.\-]+$/, 'Technology can only contain letters, +, #, dots, and hyphens')
        .min(1, 'Technology must be at least 1 character')
        .max(30, 'Technology must be less than 30 characters')
    )
    .min(1, 'At least one technology is required')
    .required(),
  projectLink: yup.string().url('Invalid URL').required('Project link is required'),
  image: yup.string().url('Invalid URL').required(),
});

type FormData = yup.InferType<typeof schema>;

const CreateProject: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      techStack: [''],
    },
  });

  // useFieldArray for techStack as string[]
  const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
    control,
    name: 'techStack',
  });

  React.useEffect(() => {
    if (id) {
      setIsEdit(true);
      setIsLoading(true);
      projectService.getProject(id)
        .then((project) => {
          reset({
            title: project.title,
            description: project.description,
            techStack: project.techStack && project.techStack.length ? project.techStack : [''],
            projectLink: project.projectLink,
            image: project.image || '',
          });
        })
        .catch(() => {
          toast.error('Failed to load project for editing');
          navigate('/projects');
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, reset, navigate]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const projectData = {
        ...data,
        techStack: (data.techStack || []).filter(tech => tech.trim() !== ''),
      };
      if (isEdit && id) {
        await projectService.updateProject(id, projectData);
        toast.success('Project updated successfully!');
      } else {
        await projectService.createProject(projectData);
        toast.success('Project created successfully!');
      }
      navigate('/projects');
    } catch (error: any) {
      toast.error(error.response?.data?.message || (isEdit ? 'Failed to update project' : 'Failed to create project'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Project' : 'Add New Project'}</h1>
          <p className="text-gray-600 mt-2">{isEdit ? 'Update your project details' : 'Showcase your work and skills'}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title
            </label>
            <input
              {...register('title')}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="My Awesome Project"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your project, its features, and what makes it special..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies Used
            </label>
            <div className="space-y-2">
              {techFields.map((field, index) => (
                <div key={field.id} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      {...register(`techStack.${index}` as const)}
                      type="text"
                      className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.techStack?.[index] ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                      }`}
                      placeholder="React, Node.js, MongoDB..."
                    />
                    {techFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTech(index)}
                        className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {errors.techStack?.[index] && (
                    <div className="flex items-center gap-2 text-orange-600 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{errors.techStack[index]?.message}</span>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendTech('' as never)}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Technology
              </button>
            </div>
            {errors.techStack && !Array.isArray(errors.techStack) && (
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 mt-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{errors.techStack.message}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Link
            </label>
            <div className="relative">
              <input
                {...register('projectLink')}
                type="url"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/username/project"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.projectLink && <p className="mt-1 text-sm text-red-600">{errors.projectLink.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Image URL
            </label>
            <div className="relative">
              <input
                {...register('image')}
                type="url"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/project-screenshot.jpg"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {isEdit ? 'Saving...' : 'Creating...'}
                </>
              ) : (
                isEdit ? 'Save Changes' : 'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;