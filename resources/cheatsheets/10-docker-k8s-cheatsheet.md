# 📋 Docker & Kubernetes for SDETs — Quick Cheatsheet

## Docker Essentials
```bash
docker build -t e2e-tests:v1 .              # Build test image
docker run --rm -v $(pwd)/reports:/app/reports e2e-tests:v1 # Run test container
docker compose up -d                        # Start multi-container env
docker compose down                         # Teardown
```

## Kubernetes Essentials
```bash
kubectl apply -f test-job.yaml              # Launch test job in cluster
kubectl get jobs                            # View test job status
kubectl logs -f job/e2e-nightly-regression  # Stream test logs
kubectl delete job e2e-nightly-regression   # Cleanup
```
