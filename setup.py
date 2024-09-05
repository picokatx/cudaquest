from setuptools import setup, Extension
from torch.utils import cpp_extension
import os
os.add_dll_directory(os.path.join(os.environ['CUDA_PATH'], 'bin'))
os.add_dll_directory("C:/Users/picokatx/Documents/cudaquest/libtorch/lib")
os.add_dll_directory(os.path.join(os.environ['CUDA_PATH'], 'lib/x64'))
setup(name='lltm_cpp',
      ext_modules=[cpp_extension.CppExtension('lltm_cpp', ['lltm.cpp'])],
      cmdclass={'build_ext': cpp_extension.BuildExtension})