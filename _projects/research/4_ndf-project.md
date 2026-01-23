---
layout: page
title: 3D Representation Learning
description: Advancing Neural Unsigned Distance Fields for Implicit 3D Function Learning
img: assets/img/p_research/ndf_shapenet2.png
importance: 6
category: machine-learning
related_publications: false
---

### My Contributions
- Enhanced the **NDF encoder bottleneck** with vector quantization and a learned codebook to capture features in both continuous and discrete modes.  
- Trained a modified NDF model on the **ShapeNet Cars dataset** using the Uni-Siegen OMNI GPU cluster (runtime: 5 days).  
- Evaluated generated 3D models with **generation metrics**, pushing forward implicit 3D representation learning.  

### Context
This project builds on the seminal work *Neural Unsigned Distance Fields for Implicit Function Learning* by [Julian Chibane](http://virtualhumans.mpi-inf.mpg.de/people/Chibane.html), [Aymen Mir](http://virtualhumans.mpi-inf.mpg.de/people/Mir.html), and [Gerard Pons-Moll](http://virtualhumans.mpi-inf.mpg.de/people/pons-moll.html), published at **NeurIPS 2020**.  

[Original Paper (PDF)](http://virtualhumans.mpi-inf.mpg.de/papers/chibane2020ndf/chibane2020ndf.pdf) | [Supplementary](http://virtualhumans.mpi-inf.mpg.de/papers/chibane2020ndf/chibane2020ndf-supp.pdf) | [Project Website](http://virtualhumans.mpi-inf.mpg.de/ndf/) | [Arxiv](https://arxiv.org/abs/2010.13938)  

### Citation
If referencing this project, please cite the original NDF paper and GIFS paper for vector quantization:  

```bibtex
@inproceedings{chibane2020ndf,
  title = {Neural Unsigned Distance Fields for Implicit Function Learning},
  author = {Chibane, Julian and Mir, Aymen and Pons-Moll, Gerard},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  month = {December},
  year = {2020},
}

@inproceedings{ye2022gifs,
  title={GIFS: Neural Implicit Function for General Shape Representation},
  author={Ye, Jianglong and Chen, Yuntao and Wang, Naiyan and Wang, Xiaolong},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  year={2022}
}
```

## Resources 
- 💻 [View Source on GitHub](https://github.com/SurajBhar/ndf) 